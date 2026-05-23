export interface ResearchItem {
  id: string;
  titleCN: string;
  titleEN: string;
  category: string;
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
  blocks?: any[];
}

export const researchData: ResearchItem[] = [];
