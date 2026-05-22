import express from "express";
import path from "path";
import https from "https";
import { createServer as createViteServer } from "vite";

// Fallback projects data (static backup)
const fallbackProjects = [
  { 
    id: 1, 
    slug: 'shanghai-psa',
    titleCN: '上海当代艺术博物馆展厅照明', 
    titleEN: 'Shanghai Power Station of Art Exhibition Lighting', 
    location: '上海', 
    locationEN: 'Shanghai',
    category: 'CULTURAL',
    image: 'https://rdilighting.com/projects/shanghai-psa/hero-image.jpg',
    heroMedia: 'https://rdilighting.com/projects/shanghai-psa/hero-image.jpg',
    aspect: 'aspect-[1/1] md:aspect-auto h-full min-h-[300px]', 
    span: 'md:row-span-2',
    gallery: ['https://rdilighting.com/projects/shanghai-psa/01.webp', 'https://rdilighting.com/projects/shanghai-psa/02.webp'],
    conceptCN: '该博物馆于2012年10月1日开馆，是中国大陆第一家公立的当代艺术博物馆。',
    conceptEN: 'Opened on October 1, 2012, this is the first public contemporary art museum in mainland China.',
    completion: '2012',
    designer: '胡国剑',
    credits: '业主单位: 上海世博土地控股有限公司'
  }
];

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
      const fetchCSV = (url: string): Promise<string[][]> => {
        return new Promise((resolve, reject) => {
          https.get(url, { rejectUnauthorized: false }, (proxyRes) => {
            const chunks: Buffer[] = [];
            proxyRes.on('data', (chunk) => chunks.push(chunk));
            proxyRes.on('end', () => {
              try {
                const buffer = Buffer.concat(chunks);
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
            proxyRes.on('error', reject);
          });
        });
      };

      const [rawRows, rawBlockRows] = await Promise.all([
        fetchCSV('https://rdilighting.oss-cn-hongkong.aliyuncs.com/media/projects/rdi_web_projects.csv'),
        fetchCSV('https://rdilighting.oss-cn-hongkong.aliyuncs.com/media/projects/rdi_web_projects_blocks.csv')
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

        // Merge rich content from static fallback if ids match
        const fallbackProj = fallbackProjects.find((p: any) => p.slug === idCell || p.id === idNum);
        const gallery = fallbackProj?.gallery || [];
        const conceptCN = fallbackProj?.conceptCN || '';
        const conceptEN = fallbackProj?.conceptEN || '';

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

        // Attach parsed blocks for this project, falling back to empty list if none
        const blocks = blocksMap[idCell] || [];

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
          credits,
          creditsEN,
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
    https.get('https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_web_home.csv', { rejectUnauthorized: false }, (proxyRes) => {
      const chunks: Buffer[] = [];
      proxyRes.on('data', (chunk) => {
        chunks.push(chunk);
      });
      proxyRes.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks);
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
            projects: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/projects.webp',
            research: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/research.webp',
            news: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/news.webp',
            about: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/about.webp'
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
    }).on('error', (err) => {
      console.error('Remote home CSV fetch error:', err);
      res.json({ success: false, error: err.message });
    });
  });

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
