import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useHelloWorld } from '../../../features/hello_world/useHelloWorld';
import { styles } from './MainStyle';
import { Colors } from '../../theme';

const MainScreen = () => {
  const { helloWorldState, fetchHelloWorld } = useHelloWorld();

  return (
    <View style={styles.container}>

      {/* Loading */}
      {helloWorldState.status === 'loading' && (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.subtitle}>Memuat data...</Text>
        </View>
      )}

      {/* Error */}
      {helloWorldState.status === 'error' && (
        <View style={styles.centerContent}>
          <Text style={styles.error}>{helloWorldState.message}</Text>
          <TouchableOpacity style={styles.button} onPress={fetchHelloWorld}>
            <Text style={styles.buttonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Success */}
      {helloWorldState.status === 'success' && (
        <View style={styles.centerContent}>
          <Text style={styles.title}>Hello World 👋</Text>
          <Text style={styles.subtitle}>ID: {helloWorldState.data.id}</Text>
          <Text style={styles.subtitle}>{helloWorldState.data.message}</Text>
          <Text style={styles.subtitle}>{helloWorldState.data.timestamp}</Text>
        </View>
      )}

      {/* Idle */}
      {helloWorldState.status === 'idle' && (
        <View style={styles.centerContent}>
          <Text style={styles.subtitle}>Ready</Text>
        </View>
      )}

    </View>
  );
};

export default MainScreen;
