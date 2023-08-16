import request from '@/utils/request';

import type { User, UserInfo } from '@/types';

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
