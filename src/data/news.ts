export interface NewsItem {
  id: string;
  titleCN: string;
  titleEN: string;
  date: string;
  category: string;
  image: string;
  url?: string;
  aspect?: string;
  span?: string;
  contentEN?: string;
  contentCN?: string;
  gallery?: string[];
  location?: string;
  tagsCN?: string;
  tagsEN?: string;
}

export const newsData: NewsItem[] = [];
