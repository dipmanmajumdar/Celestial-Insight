export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Research";

export interface BlogMetadata {
  title: string;
  author: string;
  publishDate: string;
  difficulty: Difficulty;
  tags: string[];
  thumbnailImage: string;
  excerpt: string;
  slug: string;
}

export interface BlogPost extends BlogMetadata {
  content: string;
}
