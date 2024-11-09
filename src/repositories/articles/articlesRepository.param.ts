export interface getArticlesParam {
  isGlobal?: boolean;
  page: number;
  limit?: number
}

export interface craeteArticleParam {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
