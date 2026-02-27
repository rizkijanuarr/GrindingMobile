import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import type { Post } from '../../../domain/model/PostModel';
import { useMainViewModel } from './MainViewModel';
import { styles } from './MainStyle';
import { Colors } from '../../theme';

const MainScreen = () => {
  const { postsState, fetchPosts } = useMainViewModel();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
            data={postsState.data?.data?.data ?? postsState.data?.data ?? []}
            keyExtractor={item => item.id.toString()}
            renderItem={renderPost}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={styles.listContent}
            refreshing={false}
            onRefresh={fetchPosts}
          />
        </>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;
