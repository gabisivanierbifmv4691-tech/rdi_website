/**
 * A standard, robust RFC 4180 CSV parser in TypeScript that correctly handles
 * quotes, commas inside fields, escape double-quotes, and multi-line values.
 */
export function parseCSV(csvText: string): string[][] {
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
          i++; // Skip the next quote
        } else {
          inQuotes = false; // End of quoted part
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
          i++; // Skip LF if CRLF
        }
      } else {
        currentVal += char;
      }
    }
  }

  // Push final row if exists
  if (currentVal !== '' || row.length > 0) {
    row.push(currentVal);
    if (row.some(cell => cell.trim() !== '')) {
      result.push(row);
    }
  }

  return result;
}

/**
 * Determine Project category from labels/tags.
 * Categories: 'CULTURAL', 'OFFICE', 'ART', 'HOSPITALITY', 'LANDSCAPE'
 */
export function getCategoryFromTags(tagsEn: string, tagsCn: string): string {
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
  return 'CULTURAL'; // Default backup
}
