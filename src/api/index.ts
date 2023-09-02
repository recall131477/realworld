import request from '@/utils/request';

import type {
  User,
  UserInfo,
  Author,
  CreateArticle,
  UpdateArticle,
  Article,
  ArticleConfig,
  Comment,
} from '@/types';

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

export const getArticle = (slug: string): Promise<{ article: Article }> =>
  request({
    method: 'GET',
    url: `/articles/${slug}`,
  });

export const createArticle = (params: {
  article: CreateArticle;
}): Promise<{ article: Article }> =>
  request({
    method: 'POST',
    url: '/articles',
    data: params,
  });

export const updateArticle = (
  slug: string,
  params: {
    article: UpdateArticle;
  }
): Promise<{ article: Article }> =>
  request({
    method: 'PUT',
    url: `/articles/${slug}`,
    data: params,
  });

export const deleteArticle = (slug: string): Promise<void> =>
  request({
    method: 'DELETE',
    url: `/articles/${slug}`,
  });

/** comment */
export const getComments = (slug: string): Promise<{ comments: Comment[] }> =>
  request({
    method: 'GET',
    url: `/articles/${slug}/comments`,
  });

export const createComment = (
  slug: string,
  params: {
    comment: {
      body: string;
    };
  }
): Promise<{ comment: Comment }> =>
  request({
    method: 'POST',
    url: `/articles/${slug}/comments`,
    data: params,
  });

export const deleteComment = (slug: string, id: number): Promise<void> =>
  request({
    method: 'DELETE',
    url: `/articles/${slug}/comments/${id}`,
  });

/** favorite */
export const favoriteArticle = (slug: string): Promise<{ article: Article }> =>
  request({
    method: 'POST',
    url: `/articles/${slug}/favorite`,
  });

export const unfavoriteArticle = (
  slug: string
): Promise<{ article: Article }> =>
  request({
    method: 'DELETE',
    url: `/articles/${slug}/favorite`,
  });

/** profile */
export const getProfile = (username: string): Promise<{ profile: Author }> =>
  request({
    method: 'GET',
    url: `/profiles/${username}`,
  });

export const followProfile = (username: string): Promise<{ profile: Author }> =>
  request({
    method: 'POST',
    url: `/profiles/${username}/follow`,
  });

export const unfollowProfile = (
  username: string
): Promise<{ profile: Author }> =>
  request({
    method: 'DELETE',
    url: `/profiles/${username}/follow`,
  });

/** user */
export const login = (params: { user: User }): Promise<{ user: UserInfo }> =>
  request({
    method: 'POST',
    url: '/users/login',
    data: params,
  });

export const register = (params: { user: User }): Promise<{ user: UserInfo }> =>
  request({
    method: 'POST',
    url: '/users',
    data: params,
  });

export const getUser = (): Promise<{ user: UserInfo }> =>
  request({
    method: 'GET',
    url: '/user',
  });

export const updateUser = (params: {
  user: UserInfo;
}): Promise<{ user: UserInfo }> =>
  request({
    method: 'PUT',
    url: '/user',
    data: params,
  });

/** tag */
export const getTags = (): Promise<{ tags: string[] }> =>
  request({
    method: 'GET',
    url: '/tags',
  });
