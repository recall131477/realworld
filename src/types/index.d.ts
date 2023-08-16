/** user */
export interface User {
  username?: string;
  email: string;
  password: string;
}

export interface UserInfo {
  email: string;
  password?: string;
  token?: string;
  username: string;
  bio: string;
  image: string;
}

/** article */
interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Articles {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export type ArticleType = 'global-feed' | 'my-feed';

export interface ArticleSearchParams {
  tag?: string;
  author?: string;
  favorited?: string;
  offset?: number;
  limit?: number;
}

export interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
