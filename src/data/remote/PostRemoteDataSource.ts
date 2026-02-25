// PostRemoteDataSource: panggil API lewat Service

import type {PostResponse} from '../../domain/model/PostModel';
import {PostService} from '../services/PostService';

export class PostRemoteDataSource {
  async getPosts(): Promise<PostResponse> {
    return PostService.getPosts();
  }
}
