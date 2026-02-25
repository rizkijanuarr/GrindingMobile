// UseCase: GET /posts

import type {PostResponse} from '../model/PostModel';
import type {PostRepository} from '../repository/PostRepository';

export class GetPostsUseCase {
  private repository: PostRepository;

  constructor(repository: PostRepository) {
    this.repository = repository;
  }

  async execute(): Promise<PostResponse> {
    return this.repository.getPosts();
  }
}
