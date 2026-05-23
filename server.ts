import express from "express";
import path from "path";
import https from "https";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Fallback projects data (static backup)
const fallbackProjects: any[] = [];

const fallbackNewsDetails: Record<string, {
  location?: string;
  contentCN?: string;
  contentEN?: string;
  gallery?: string[];
}> = {
  '20240515_lda': {
    location: 'Berlin, Germany',
    contentEN: 'rdi international lighting has been awarded the 2024 Lighting Design Award for its groundbreaking work in sustainable urban lighting. The jury praised our innovative approach to reducing light pollution while enhancing safety.',
    contentCN: 'rdi 国际照明凭借其在可持续城市照明领域的开创性成果，荣获 2024 年度照明设计大奖。评委会对我们在减少光污染、提高安全性方面的创新方法给予了高度评价。',
    gallery: [
      'https://images.unsplash.com/photo-1565019053026-6202497042a9',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
    ]
  },
  '20240422_sun': {
    location: 'Shanghai, China',
    contentEN: 'Our latest panel discussion at the Lighting Summit explored how modern cities can balance aesthetic appeal with energy efficiency. Experts shared insights on the next generation of LED technologies.',
    contentCN: '近期在照明峰会上进行的专题讨论探索了现代城市如何平衡美学吸引力与能源效率。专家们分享了关于下一代 LED 技术的见解。',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2'
    ]
  },
  '20250909_exh': {
    location: 'Shanghai, China'
  },
  '20260515_cau': {
    location: 'Shanghai, China',
    contentCN: '5月11日晚，同济大学建筑与城市规划学院 CAUP 红楼钟庭化作光影交织的奇幻秘境。联合国教科文组织（UNESCO）“国际光日”注册活动暨2026年建筑物理光环境课程作业展示评审活动璀璨启幕。',
    contentEN: 'On the evening of May 11, the Red Building Courtyard at Tongji University CAUP transformed into a fantasy realm of interwoven light and shadow. The UNESCO registered event and the 2026 Architectural Lighting Coursework Exhibition commenced.'
  },
  '20260501_ld': {
    location: 'Shanghai, China',
    contentCN: 'RDI及全体员工，向每一位辛勤耕耘的奋斗者致以诚挚敬意！祝大家五一劳动节快乐，诸事顺遂，劳有所获，岁岁安康！',
    contentEN: 'RDI wishes you and your family a happy Labor Day, good health and every success in work.'
  }
};

const fallbackResearchDetails: Record<string, {
  location?: string;
  contentCN?: string;
  contentEN?: string;
  gallery?: string[];
}> = {
  'street_lighting': {
    location: 'Berlin, Germany',
    contentEN: 'Our urban lighting research focuses on how smart LED technology can transform city nightscapes while reducing energy consumption by up to 40%.',
    contentCN: '我们的城市照明研究重点关注智能 LED 技术如何在将能源消耗降低高达 40% 的同时，重塑城市夜景。',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457'
    ]
  },
  'museum_lighting': {
    location: 'Paris, France',
    contentEN: 'Exploring the transition from halogen to fiber optics and high-CRI LED solutions in preserving world-class artifacts.',
    contentCN: '探索在保护世界级文物过程中，从卤素灯到光纤及其高显色指数 LED 解决方案的转变。',
    gallery: [
      'https://images.unsplash.com/photo-1565019053026-6202497042a9'
    ]
  }
};

function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentVal += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(currentVal);
        currentVal = '';
      } else if (char === '\n' || char === '\r') {
        row.push(currentVal);
        currentVal = '';
        if (row.length > 0 && row.some(cell => cell.trim() !== '')) {
          result.push(row);
        }
        row = [];
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentVal += char;
      }
    }
  }

  if (currentVal !== '' || row.length > 0) {
    row.push(currentVal);
    if (row.some(cell => cell.trim() !== '')) {
      result.push(row);
    }
  }

  return result;
}

function getCategoryFromTags(tagsEn: string, tagsCn: string): string {
  const tEn = (tagsEn || '').toUpperCase();
  const tCn = (tagsCn || '');
  if (
    tEn.includes('CULTURAL') || 
    tEn.includes('MUSEUM') || 
    tEn.includes('EXHIBITION') || 
    tEn.includes('LIBRARY') || 
    tEn.includes('SHOW') ||
    tCn.includes('文化') || 
    tCn.includes('博物馆') || 
    tCn.includes('展厅') || 
    tCn.includes('展陈') ||
    tCn.includes('展外')
  ) {
    return 'CULTURAL';
  }
  if (
    tEn.includes('OFFICE') || 
    tEn.includes('ATRIUM') ||
    tCn.includes('办公') ||
    tCn.includes('写字楼')
  ) {
    return 'OFFICE';
  }
  if (
    tEn.includes('ART') || 
    tEn.includes('SCULPTURE') || 
    tEn.includes('INSTALLATION') || 
    tCn.includes('艺术') || 
    tCn.includes('装置') || 
    tCn.includes('雕塑')
  ) {
    return 'ART';
  }
  if (
    tEn.includes('HOTEL') || 
    tEn.includes('HOSPITALITY') || 
    tEn.includes('LOBBY') || 
    tCn.includes('酒店') || 
    tCn.includes('大堂') ||
    tCn.includes('餐饮')
  ) {
    return 'HOSPITALITY';
  }
  if (
    tEn.includes('LANDSCAPE') || 
    tEn.includes('EXTERNAL') || 
    tEn.includes('EXTERIOR') || 
    tEn.includes('FACADE') || 
    tEn.includes('GARDEN') || 
    tEn.includes('COMMERCIAL') || 
    tEn.includes('TOWERS') ||
    tEn.includes('TALL') ||
    tCn.includes('景观') || 
    tCn.includes('外观') || 
    tCn.includes('外立面') || 
    tCn.includes('商业') || 
    tCn.includes('广场') ||
    tCn.includes('超高层')
  ) {
    return 'LANDSCAPE';
  }
  return 'CULTURAL';
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add CORS headers for the API layer
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    next();
  });

  // Serve proxy route to fetch project CSV and convert it to clean UTF-8 JSON
  app.get("/api/projects", async (req, res) => {
    try {
      const fetchCSV = (filePath: string): Promise<string[][]> => {
        return new Promise((resolve, reject) => {
          const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
          const absolutePath = path.join(process.cwd(), cleanPath);
          fs.readFile(absolutePath, (err, buffer) => {
            if (err) {
              reject(err);
              return;
            }
            try {
              let csvText = '';
              try {
                csvText = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
              } catch (e) {
                csvText = new TextDecoder('gbk').decode(buffer);
              }
              resolve(parseCSV(csvText));
            } catch (e) {
              reject(e);
            }
          });
        });
      };

      const [rawRows, rawBlockRows] = await Promise.all([
        fetchCSV('dist/assets/projects/rdi_web_projects.csv'),
        fetchCSV('dist/assets/projects/rdi_web_projects_blocks.csv')
      ]);

      const blocksMap: Record<string, any[]> = {};
      for (let i = 0; i < rawBlockRows.length; i++) {
        const row = rawBlockRows[i];
        if (row.length < 3) continue;
        const blockId = row[0] ? row[0].trim() : '';
        const block_order = parseInt(row[1]) || 0;
        const block_type = row[2] ? row[2].trim() : '';
        const layout_style = row[3] ? row[3].trim() : '';

        // Skip headers
        if (
          !blockId ||
          blockId === 'project_id' ||
          blockId.includes('字段名') ||
          blockId.includes('填写说明') ||
          blockId.includes('网页排版') ||
          blockId.includes('是否选填') ||
          block_type === 'block_type'
        ) {
          continue;
        }

        const c1_cn = row[4] ? row[4].trim() : '';
        const c1_en = row[5] ? row[5].trim() : '';
        const c2_cn = row[6] ? row[6].trim() : '';
        const c2_en = row[7] ? row[7].trim() : '';

        if (!blocksMap[blockId]) {
          blocksMap[blockId] = [];
        }
        blocksMap[blockId].push({
          order: block_order,
          type: block_type,
          style: layout_style,
          c1_cn,
          c1_en,
          c2_cn,
          c2_en
        });
      }

      // Sort blocks by order
      for (const pid in blocksMap) {
        blocksMap[pid].sort((a, b) => a.order - b.order);
      }

      const parsedProjects = [];

      for (let i = 0; i < rawRows.length; i++) {
        const row = rawRows[i];
        if (row.length < 5) continue;

        const firstCell = row[0] ? row[0].trim() : '';
        const noCell = row[1] ? row[1].trim() : '';
        const idCell = row[2] ? row[2].trim() : '';

        // Skip header and instruction lines (first 5 lines)
        if (
          firstCell.includes('列号') || 
          firstCell.includes('字段名') || 
          firstCell.includes('填写说明') || 
          firstCell.includes('网页排版') || 
          firstCell.includes('是否选填') ||
          i < 5
        ) {
          continue;
        }

        if (!idCell) continue;

        const idNum = parseInt(noCell) || (i - 4);
        const titleCN = row[3] ? row[3].trim() : '';
        const titleEN = row[4] ? row[4].trim() : '';
        const locationCN = row[5] ? row[4].trim() : ''; // or index 5 as location_cn
        const locationEN = row[6] ? row[6].trim() : '';
        const tagsCN = row[7] ? row[7].trim() : '';
        const tagsEN = row[8] ? row[8].trim() : '';
        const rawImage = row[9] ? row[9].trim() : '';
        const aspect = row[10] ? row[10].trim() : '';
        const span = row[11] ? row[11].trim() : '';
        const completion = row[12] ? row[12].trim() : '';
        const heroMedia = row[13] ? row[13].trim() : '';
        const designerCN = row[14] ? row[14].trim() : '';
        const designerEN = row[15] ? row[15].trim() : '';
        const credits = row[16] ? row[16].trim() : '';
        const creditsEN = row[17] ? row[17].trim() : '';

        // Attach parsed blocks for this project, falling back to empty list if none
        const blocks = blocksMap[idCell] || [];

        // Dynamically extract concept text and gallery from blocks
        let conceptCN = '';
        let conceptEN = '';
        const gallerySet = new Set<string>();

        for (const block of blocks) {
          if (!conceptCN && block.type === 'text_1col') {
            conceptCN = block.c1_cn ? block.c1_cn.replace(/^###.*?\n/gm, '').replace(/^###.*/gm, '').trim() : '';
            conceptEN = block.c1_en ? block.c1_en.replace(/^###.*?\n/gm, '').replace(/^###.*/gm, '').trim() : '';
          }
          if (block.type === 'image_full' && block.c1_cn) {
            gallerySet.add(block.c1_cn.trim());
          } else if (block.type === 'text_img' && block.c2_cn) {
            gallerySet.add(block.c2_cn.trim());
          } else if (block.type === 'image_grid' && block.c1_cn) {
            const urls = block.c1_cn.split(',').map((u: string) => u.trim()).filter(Boolean);
            urls.forEach((u: string) => gallerySet.add(u));
          }
        }
        const gallery = Array.from(gallerySet);

        // Fallback image logic
        let image = rawImage;
        if (!image) {
          if (heroMedia && !heroMedia.endsWith('.mp4')) {
            image = heroMedia;
          } else if (gallery.length > 0) {
            image = gallery[0];
          } else {
            image = heroMedia; // will be handled gracefully if video
          }
        }

        const category = getCategoryFromTags(tagsEN, tagsCN);

        parsedProjects.push({
          id: idNum,
          slug: idCell,
          titleCN,
          titleEN,
          location: row[5] ? row[5].trim() : '', // locationCN
          locationEN: locationEN,
          category,
          image: image || heroMedia,
          aspect,
          span,
          heroMedia,
          gallery,
          conceptCN,
          conceptEN,
          completion,
          designer: designerCN,
          designerCN,
          designerEN,
          credits: credits,
          creditsEN,
          tagsCN,
          tagsEN,
          blocks
        });
      }

      if (parsedProjects.length > 0) {
        res.json({ success: true, projects: parsedProjects });
      } else {
        res.json({ success: true, projects: fallbackProjects });
      }
    } catch (e: any) {
      console.error("Error processing CSV parse on server", e);
      res.json({ success: false, error: e.message, projects: fallbackProjects });
    }
  });

  // Serve proxy route to fetch home layout CSV and convert it to clean JSON
  app.get("/api/home-config", (req, res) => {
    const csvPath = path.join(process.cwd(), 'dist/assets/public/rdi_web_home.csv');
    fs.readFile(csvPath, (err, buffer) => {
      if (err) {
        console.error('Local home CSV read error:', err);
        res.json({ success: false, error: err.message });
        return;
      }
      try {
        let csvText = '';
        try {
          csvText = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
        } catch (e) {
          csvText = new TextDecoder('gbk').decode(buffer);
        }

        const rawRows = parseCSV(csvText);
        const heroSlides: string[] = [];
        const gridItems: { id: string; aspect: string; span: string }[] = [];
        const hiddenMenu = {
          projects: 'https://kgmlighting.com.cn/public/projects.webp',
          research: 'https://kgmlighting.com.cn/public/research.webp',
          news: 'https://kgmlighting.com.cn/public/news.webp',
          about: 'https://kgmlighting.com.cn/public/about.webp'
        };
        const icons: Record<string, string> = {};

        let heroHeaderIndex = -1;
        let gridHeaderIndex = -1;
        let hiddenMenuHeaderIndex = -1;
        let iconsHeaderIndex = -1;

        for (let i = 0; i < rawRows.length; i++) {
          const cell0 = rawRows[i][0] ? rawRows[i][0].trim() : '';
          if (cell0.includes('首屏大图')) {
            heroHeaderIndex = i;
          } else if (cell0.includes('图片栏')) {
            gridHeaderIndex = i;
          } else if (cell0.includes('隐藏菜单')) {
            hiddenMenuHeaderIndex = i;
          } else if (cell0.includes('图标')) {
            iconsHeaderIndex = i;
          }
        }

        if (heroHeaderIndex !== -1 && rawRows[heroHeaderIndex + 1]) {
          const idRow = rawRows[heroHeaderIndex + 1];
          for (let j = 1; j < idRow.length; j++) {
            const val = idRow[j] ? idRow[j].trim() : '';
            if (val && val.toLowerCase() !== 'id') {
              heroSlides.push(val);
            }
          }
        }

        if (gridHeaderIndex !== -1) {
          let idRow: string[] = [];
          let aspectRow: string[] = [];
          let spanRow: string[] = [];

          for (let i = gridHeaderIndex + 1; i < rawRows.length; i++) {
            const cell0 = rawRows[i][0] ? rawRows[i][0].toLowerCase().trim() : '';
            if (cell0 === 'id') {
              idRow = rawRows[i];
            } else if (cell0 === 'aspect') {
              aspectRow = rawRows[i];
            } else if (cell0 === 'span') {
              spanRow = rawRows[i];
            }
          }

          if (idRow.length > 0) {
            for (let j = 1; j < idRow.length; j++) {
              const idVal = idRow[j] ? idRow[j].trim() : '';
              if (idVal) {
                const aspectVal = (aspectRow && aspectRow[j]) ? aspectRow[j].trim() : '';
                const spanVal = (spanRow && spanRow[j]) ? spanRow[j].trim() : '';
                gridItems.push({
                  id: idVal,
                  aspect: aspectVal,
                  span: spanVal
                });
              }
            }
          }
        }

        if (hiddenMenuHeaderIndex !== -1 && rawRows[hiddenMenuHeaderIndex + 1]) {
          const valRow = rawRows[hiddenMenuHeaderIndex + 1];
          if (valRow[1]) hiddenMenu.projects = valRow[1].trim();
          if (valRow[2]) hiddenMenu.research = valRow[2].trim();
          if (valRow[3]) hiddenMenu.news = valRow[3].trim();
          if (valRow[4]) hiddenMenu.about = valRow[4].trim();
        }

        if (iconsHeaderIndex !== -1 && rawRows[iconsHeaderIndex] && rawRows[iconsHeaderIndex + 1]) {
          const headerRow = rawRows[iconsHeaderIndex];
          const valRow = rawRows[iconsHeaderIndex + 1];
          for (let j = 1; j < headerRow.length; j++) {
            const platform = headerRow[j] ? headerRow[j].trim().toLowerCase() : '';
            const iconUrl = valRow[j] ? valRow[j].trim() : '';
            if (platform && iconUrl) {
              icons[platform] = iconUrl;
            }
          }
        }

        res.json({ success: true, heroSlides, gridItems, hiddenMenu, icons });
      } catch (e: any) {
        console.error("Error processing home-config CSV parse on server", e);
        res.json({ success: false, error: e.message });
      }
    });
  });

  // Serve proxy route to fetch news CSV and convert it to clean JSON
  app.get("/api/news", async (req, res) => {
    try {
      const csvPath = path.join(process.cwd(), 'dist/assets/News/rdi_web_news.csv');
      fs.readFile(csvPath, (err, buffer) => {
        if (err) {
          console.error('Local news CSV read error:', err);
          res.json({ success: false, error: err.message });
          return;
        }
        try {
          let csvText = '';
          try {
            csvText = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
          } catch (e) {
            csvText = new TextDecoder('gbk').decode(buffer);
          }

          const rawRows = parseCSV(csvText);
          const parsedNews = [];

          for (let i = 0; i < rawRows.length; i++) {
            const row = rawRows[i];
            if (row.length < 5) continue;

            const firstCell = row[0] ? row[0].trim() : '';
            const noCell = row[1] ? row[1].trim() : '';
            const idCell = row[2] ? row[2].trim() : '';

            // Skip header and instruction lines (first 5 lines)
            if (
              firstCell.includes('列号') || 
              firstCell.includes('字段名') || 
              firstCell.includes('填写说明') || 
              firstCell.includes('网页排版') || 
              firstCell.includes('是否选填') ||
              i < 5
            ) {
              continue;
            }

            if (!idCell) continue;

            const idNum = noCell || (i - 4).toString();
            const titleCN = row[3] ? row[3].trim() : '';
            const titleEN = row[4] ? row[4].trim() : '';
            const tagsCN = row[5] ? row[5].trim() : '';
            const tagsEN = row[6] ? row[6].trim() : '';
            const image = row[7] ? row[7].trim() : '';
            const aspect = row[8] ? row[8].trim() : '';
            const span = row[9] ? row[9].trim() : '';
            const date = row[10] ? row[10].trim() : '';

            const category = tagsEN ? tagsEN.toUpperCase() : 'NEWS';

            // Merge details
            const detail = fallbackNewsDetails[idCell] || {};

            parsedNews.push({
              id: idCell,
              titleCN,
              titleEN,
              date,
              category,
              image,
              aspect,
              span,
              tagsCN,
              tagsEN,
              location: detail.location || '',
              contentCN: detail.contentCN || '',
              contentEN: detail.contentEN || '',
              gallery: detail.gallery || []
            });
          }

          res.json({ success: true, news: parsedNews });
        } catch (e: any) {
          console.error("Error processing news CSV parse on server", e);
          res.json({ success: false, error: e.message });
        }
      });
    } catch (e: any) {
      console.error("Error fetching news raw routing on server", e);
      res.json({ success: false, error: e.message });
    }
  });

  // Serve proxy route to fetch research CSV and convert it to clean JSON
  app.get("/api/research", async (req, res) => {
    try {
      const csvPath = path.join(process.cwd(), 'https://kgmlighting.com.cn/research/rdi_web_research.csv');
      fs.readFile(csvPath, (err, buffer) => {
        if (err) {
          console.error('Local research CSV read error:', err);
          res.json({ success: false, error: err.message });
          return;
        }
        try {
          let csvText = '';
          try {
            csvText = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
          } catch (e) {
            csvText = new TextDecoder('gbk').decode(buffer);
          }

          const rawRows = parseCSV(csvText);
          const parsedResearch = [];

          for (let i = 0; i < rawRows.length; i++) {
            const row = rawRows[i];
            if (row.length < 5) continue;

            const firstCell = row[0] ? row[0].trim() : '';
            const noCell = row[1] ? row[1].trim() : '';
            const idCell = row[2] ? row[2].trim() : '';

            // Skip header and instruction lines (first 5 lines)
            if (
              firstCell.includes('列号') || 
              firstCell.includes('字段名') || 
              firstCell.includes('填写说明') || 
              firstCell.includes('网页排版') || 
              firstCell.includes('是否选填') ||
              i < 5
            ) {
              continue;
            }

            if (!idCell) continue;

            const titleCN = row[3] ? row[3].trim() : '';
            const titleEN = row[4] ? row[4].trim() : '';
            const tagsCN = row[5] ? row[5].trim() : '';
            const tagsEN = row[6] ? row[6].trim() : '';
            const image = row[7] ? row[7].trim() : '';
            const aspect = row[8] ? row[8].trim() : '';
            const span = row[9] ? row[9].trim() : '';
            const date = row[10] ? row[10].trim() : '';

            const category = tagsEN ? tagsEN.toUpperCase() : 'URBAN';

            const detail = fallbackResearchDetails[idCell] || {};

            parsedResearch.push({
              id: idCell,
              titleCN,
              titleEN,
              date,
              category,
              image,
              aspect,
              span,
              tagsCN,
              tagsEN,
              location: detail.location || '',
              contentCN: detail.contentCN || '',
              contentEN: detail.contentEN || '',
              gallery: detail.gallery || []
            });
          }

          res.json({ success: true, research: parsedResearch });
        } catch (e: any) {
          console.error("Error processing research CSV parse on server", e);
          res.json({ success: false, error: e.message });
        }
      });
    } catch (e: any) {
      console.error("Error fetching research raw routing on server", e);
      res.json({ success: false, error: e.message });
    }
  });

  // Serve the media directory (including rdi_logo, icons, etc.) as static files
  app.use('/media', express.static(path.join(process.cwd(), 'media')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
