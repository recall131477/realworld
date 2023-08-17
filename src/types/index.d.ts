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

export interface Article {
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

type ArticleType = 'global-feed' | 'my-feed';

interface ArticleSearchParams {
  tag?: string;
  author?: string;
  favorited?: string;
  offset?: number;
  limit?: number;
}

export interface ArticleConfig {
  type: ArticleType;
  params: ArticleSearchParams;
}
