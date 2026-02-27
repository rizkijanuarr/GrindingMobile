// MainViewModel: semua logic ada di sini
// Screen tinggal consume state & action dari hook ini

import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { UiState } from '../../../core/common/UiState';
import { GetPostsUseCase } from '../../../domain/usecase/GetPostsUseCase';
import { postRepository } from '../../../core/di/RepositoryModule';
import type { PostResponse } from '../../../domain/model/PostModel';
import React from 'react';

// UseCase di-inject dari DI module
const getPostsUseCase = new GetPostsUseCase(postRepository);

export const useMainViewModel = () => {
  const [postsState, setPostsState] = useState<UiState<PostResponse>>(UiState.idle());

  const fetchPosts = useCallback(async () => {
    setPostsState(UiState.loading());
    try {
      const data = await getPostsUseCase.execute();
      setPostsState(UiState.success(data));
      
      // Debug response structure
      // console.log('[MainViewModel] Posts fetched successfully');
      // console.log('[MainViewModel] Response data:', JSON.stringify(data, null, 2));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
      setPostsState(UiState.error(message));
      // console.error('[MainViewModel] Fetch error:', message);
    }
  }, []);

  // Auto-refresh saat screen focus (seperti onResume di Kotlin)
  useFocusEffect(
    React.useCallback(() => {
      // console.log('[MainViewModel] Screen focused, fetching posts...');
      fetchPosts();
      
      // Cleanup (optional: onPause)
      return () => {
        // console.log('[MainViewModel] Screen blurred');
      };
    }, [fetchPosts])
  );

  return {
    postsState,
    fetchPosts,
  };
};
