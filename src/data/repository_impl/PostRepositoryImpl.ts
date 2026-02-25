// PostRepositoryImpl: implementasi konkrit dari PostRepository interface

import type {PostRepository} from '../../domain/repository/PostRepository';
import type {PostResponse} from '../../domain/model/PostModel';
import {PostRemoteDataSource} from '../remote/PostRemoteDataSource';

export class PostRepositoryImpl implements PostRepository {
  private remoteDataSource: PostRemoteDataSource;

  constructor() {
    this.remoteDataSource = new PostRemoteDataSource();
  }

  async getPosts(): Promise<PostResponse> {
    return this.remoteDataSource.getPosts();
  }
}
