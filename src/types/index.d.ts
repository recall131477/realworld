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

export interface CreateArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface UpdateArticle {
  title: string;
  description: string;
  body: string;
}

export interface Article extends CreateArticle {
  slug: string;
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

/** comment */
export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}
