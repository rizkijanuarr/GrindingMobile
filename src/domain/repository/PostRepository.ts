// Domain Repository: INTERFACE

import type {PostResponse} from '../model/PostModel';

export interface PostRepository {
  getPosts(): Promise<PostResponse>;
  createPost(body: any): Promise<any>;
}
