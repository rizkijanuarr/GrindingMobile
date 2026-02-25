// MainViewModel: semua logic ada di sini
// Screen tinggal consume state & action dari hook ini

import {useState, useCallback, useEffect} from 'react';
import {UiState} from '../../../core/common/UiState';
import {GetPostsUseCase} from '../../../domain/usecase/GetPostsUseCase';
import {postRepository} from '../../../core/di/RepositoryModule';
import type {PostResponse} from '../../../domain/model/PostModel';

// UseCase di-inject dari DI module
const getPostsUseCase = new GetPostsUseCase(postRepository);

export const useMainViewModel = () => {
  const [postsState, setPostsState] = useState<UiState<PostResponse>>(
    UiState.idle(),
  );

  const fetchPosts = useCallback(async () => {
    setPostsState(UiState.loading());
    try {
      const data = await getPostsUseCase.execute();
      setPostsState(UiState.success(data));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Terjadi kesalahan';
      setPostsState(UiState.error(message));
    }
  }, []);

  // Auto fetch saat pertama kali masuk screen
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    postsState,
    fetchPosts,
  };
};
