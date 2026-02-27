// PostService: define API endpoints untuk Post

import {networkModule} from '../../core/network/NetworkModule';
import type {PostResponse} from '../../domain/model/PostModel';

export const PostService = {
  getPosts: (): Promise<PostResponse> => {
    return networkModule.request<PostResponse>('/posts');
  },

  createPost: (body: any): Promise<any> => {
    return networkModule.request<any>('/posts', {
      method: 'POST',
      body,
    });
  },
};
