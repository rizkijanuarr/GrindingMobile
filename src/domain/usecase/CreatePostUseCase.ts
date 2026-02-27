// CreatePostUseCase: handle logic untuk create post

import type { PostRepository } from '../repository/PostRepository';

export class CreatePostUseCase {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async execute(body: any): Promise<any> {
    return this.postRepository.createPost(body);
  }
}
