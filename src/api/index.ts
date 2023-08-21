import request from '@/utils/request';

import type { User, UserInfo, Author, Article, ArticleConfig } from '@/types';

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
