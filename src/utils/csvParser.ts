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
 * Determine Project category dynamically from labels/tags.
 */
export function getCategoryFromTags(tagsEn: string, tagsCn: string): string {
  if (tagsEn) {
    return tagsEn.split(/[,，、]/)[0]?.trim().toUpperCase() || 'PROJECT';
  }
  if (tagsCn) {
    return tagsCn.split(/[,，、]/)[0]?.trim() || 'PROJECT';
  }
  return 'PROJECT';
}
