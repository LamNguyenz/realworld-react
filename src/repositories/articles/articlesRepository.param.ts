export interface getArticlesParam {
  isGlobal?: boolean;
  page: number;
  limit?: number
}

export interface getArticleParam {
  slug: string;
} 

export interface craeteArticleParam {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface updateArticleParam {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface deleteArticleParam {
  slug: string;
}

export interface createCommentParam {
  slug: string;
  body: string;
}

export interface deleteCommentParam {
  slug: string;
  id: string;
}

