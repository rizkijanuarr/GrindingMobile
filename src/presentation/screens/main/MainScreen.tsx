// MainScreen (View): HANYA render UI
// Semua logic di-handle oleh MainViewModel

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useMainViewModel } from './MainViewModel';
import { Colors, Spacing, FontSize } from '../../theme';
import { FontFamily } from '../../../core/common/Constant';
import type { Post } from '../../../domain/model/PostModel';

const MainScreen = () => {
  const { postsState, fetchPosts } = useMainViewModel();

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={2}>
        {item.content}
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Belum ada post</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Loading */}
      {postsState.status === 'loading' && (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.subtitle}>Memuat data...</Text>
        </View>
      )}

      {/* Error */}
      {postsState.status === 'error' && (
        <View style={styles.centerContent}>
          <Text style={styles.error}>{postsState.message}</Text>
          <TouchableOpacity style={styles.button} onPress={fetchPosts}>
            <Text style={styles.buttonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Success */}
      {postsState.status === 'success' && (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Posts</Text>
            <Text style={styles.subtitle}>
              Total: {postsState.data.data.total} | Page:{' '}
              {postsState.data.data.current_page}/
              {postsState.data.data.last_page}
            </Text>
          </View>

          <FlatList
            data={postsState.data.data.data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderPost}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={styles.listContent}
            refreshing={false}
            onRefresh={fetchPosts}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  header: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSize.xxl,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  listContent: {
    padding: Spacing.md,
    flexGrow: 1,
  },
  postCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  postTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.semiBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  postContent: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyText: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  error: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.regular,
    color: Colors.error,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
  },
});

export default MainScreen;
