export interface ResearchItem {
  id: string;
  titleCN: string;
  titleEN: string;
  category: string;
  categoryCN?: string;
  categoryEN?: string;
  image: string;
  date?: string;
  url?: string;
  aspect?: string;
  span?: string;
  contentEN?: string;
  contentCN?: string;
  gallery?: string[];
  location?: string;
  tagsCN?: string;
  tagsEN?: string;
  creditsCN?: string;
  creditsEN?: string;
  seoMeta?: string;
  geoEntities?: string;
  blocks?: any[];
}

export const researchData: ResearchItem[] = [];
