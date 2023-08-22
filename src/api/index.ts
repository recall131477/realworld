import request from '@/utils/request';

import type {
  User,
  UserInfo,
  Author,
  CreateArticle,
  UpdateArticle,
  Article,
  ArticleConfig,
} from '@/types';

/** user */
export const login = (params: { user: User }): Promise<{ user: UserInfo }> => {
  return request({
    method: 'POST',
    url: '/users/login',
    data: params,
  });
};

export const register = (params: {
  user: User;
}): Promise<{ user: UserInfo }> => {
  return request({
    method: 'POST',
    url: '/users',
    data: params,
  });
};

export const getUser = (): Promise<{ user: UserInfo }> => {
  return request({
    method: 'GET',
    url: '/user',
  });
};

export const updateUser = (params: {
  user: UserInfo;
}): Promise<{ user: UserInfo }> => {
  return request({
    method: 'PUT',
    url: '/user',
    data: params,
  });
};

/** tag */
export const getTags = (): Promise<{ tags: string[] }> => {
  return request({
    method: 'GET',
    url: '/tags',
  });
};

/** article */
export const getArticles = (
  config: ArticleConfig
): Promise<{ articles: Article[]; articlesCount: number }> => {
  const url = `/articles${config.type === 'my-feed' ? '/feed' : ''}`;

  return request({
    method: 'GET',
    url,
    params: config.params,
  });
};

export const getArticle = (slug: string): Promise<{ article: Article }> => {
  return request({
    method: 'GET',
    url: `/articles/${slug}`,
  });
};

export const createArticle = (params: {
  article: CreateArticle;
}): Promise<{ article: Article }> => {
  return request({
    method: 'POST',
    url: '/articles',
    data: params,
  });
};

export const updateArticle = (
  slug: string,
  params: {
    article: UpdateArticle;
  }
): Promise<{ article: Article }> => {
  return request({
    method: 'PUT',
    url: `/articles/${slug}`,
    data: params,
  });
};

export const deleteArticle = (slug: string): Promise<void> => {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}`,
  });
};

/** favorite */
export const favoriteArticle = (
  slug: string
): Promise<{ article: Article }> => {
  return request({
    method: 'POST',
    url: `/articles/${slug}/favorite`,
  });
};

export const unfavoriteArticle = (
  slug: string
): Promise<{ article: Article }> => {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}/favorite`,
  });
};

/** profile */
export const getProfile = (username: string): Promise<{ profile: Author }> => {
  return request({
    method: 'GET',
    url: `/profiles/${username}`,
  });
};

export const followProfile = (
  username: string
): Promise<{ profile: Author }> => {
  return request({
    method: 'POST',
    url: `/profiles/${username}/follow`,
  });
};

export const unfollowProfile = (
  username: string
): Promise<{ profile: Author }> => {
  return request({
    method: 'DELETE',
    url: `/profiles/${username}/follow`,
  });
};
