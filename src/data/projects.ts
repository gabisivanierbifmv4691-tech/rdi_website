export interface ProjectBlock {
  order: number;
  type: string;
  style?: string;
  c1_cn?: string;
  c1_en?: string;
  c2_cn?: string;
  c2_en?: string;
}

export interface Project {
  id: number;
  slug: string;
  titleCN: string;
  titleEN: string;
  location: string;
  locationEN?: string;
  category: string;
  image: string;
  heroMedia?: string;
  aspect?: string;
  span?: string;
  gallery?: string[];
  conceptCN?: string;
  conceptEN?: string;
  completion?: string;
  designer?: string;
  designerCN?: string;
  designerEN?: string;
  credits?: string;
  creditsEN?: string;
  tagsCN?: string;
  tagsEN?: string;
  blocks?: ProjectBlock[];
}

export const projectsData: Project[] = [];
