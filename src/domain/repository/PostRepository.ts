// Domain Repository: INTERFACE
// Domain gak tau implementasinya gimana, cuma tau kontrak

import type {PostResponse} from '../model/PostModel';

export interface PostRepository {
  getPosts(): Promise<PostResponse>;
}
