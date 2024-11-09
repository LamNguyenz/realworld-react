export interface IProfileInfo {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  favorited: true;
  favoritesCount: number;
  author: IProfileInfo;
}
