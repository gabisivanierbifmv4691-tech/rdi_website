import type { Language } from '../App';

export const getLocationLabel = (location: string, lang: Language, locationEN?: string): string => {
  const loc = (location || '').trim();
  const lowerLoc = loc.toLowerCase();

  const mapping: Record<string, { cn: string; en: string }> = {
    cologne: { cn: '德国，科隆', en: 'Cologne, Germany' },
    berlin: { cn: '德国，柏林', en: 'Berlin, Germany' },
    oslo: { cn: '挪威，奥斯陆', en: 'Oslo, Norway' },
    paris: { cn: '法国，巴黎', en: 'Paris, France' },
    zurich: { cn: '瑞士，苏黎世', en: 'Zurich, Switzerland' },
    kronberg: { cn: '德国，克龙贝格', en: 'Kronberg, Germany' },
    vienna: { cn: '奥地利，维也纳', en: 'Vienna, Austria' },
    munich: { cn: '德国，慕尼黑', en: 'Munich, Germany' },
    barcelona: { cn: '西班牙，巴塞罗那', en: 'Barcelona, Spain' },
    frankfurt: { cn: '德国，法兰克福', en: 'Frankfurt, Germany' },
    london: { cn: '英国，伦敦', en: 'London, UK' },
    stockholm: { cn: '瑞典，斯德哥尔摩', en: 'Stockholm, Sweden' },
    geneva: { cn: '瑞士，日内瓦', en: 'Geneva, Switzerland' },
    hamburg: { cn: '德国，汉堡', en: 'Hamburg, Germany' },
    singapore: { cn: '新加坡', en: 'Singapore' },
    dubai: { cn: '阿联酋，迪拜', en: 'Dubai, UAE' },
    rome: { cn: '意大利，罗马', en: 'Rome, Italy' },
    tokyo: { cn: '日本，东京', en: 'Tokyo, Japan' },
    nanjing: { cn: '中国，南京', en: 'Nanjing, China' },
    shanghai: { cn: '中国，上海', en: 'Shanghai, China' },
    zhengzhou: { cn: '中国，郑州', en: 'Zhengzhou, China' },
  };

  const match = mapping[lowerLoc] || (locationEN ? mapping[locationEN.toLowerCase()] : null);
  if (match) {
    return lang === 'cn' ? match.cn : match.en;
  }

  // Fallback if city not in mapping
  if (lang === 'cn') {
    // If it's already Chinese (e.g. contains Chinese characters), don't prepend '中国，' if it starts with it or similar
    const cleanCn = loc;
    return cleanCn.includes('中国') ? cleanCn : `中国，${cleanCn}`;
  } else {
    const cleanEn = locationEN || loc;
    return cleanEn.includes('China') ? cleanEn : `${cleanEn}, China`;
  }
};
