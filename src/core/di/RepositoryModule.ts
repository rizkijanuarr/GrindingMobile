// RepositoryModule: DI container untuk semua repository
// Satu tempat untuk bikin & inject semua repository

import {HelloWorldRepositoryImpl} from '../../data/repository_impl/HelloWorldRepositoryImpl';
import type {HelloWorldRepository} from '../../domain/repository/HelloWorldRepository';
import {PostRepositoryImpl} from '../../data/repository_impl/PostRepositoryImpl';
import type {PostRepository} from '../../domain/repository/PostRepository';

// Repository instances (singleton)
// Data layer di-inject ke domain layer lewat sini

export const helloWorldRepository: HelloWorldRepository =
  new HelloWorldRepositoryImpl();

export const postRepository: PostRepository = new PostRepositoryImpl();
