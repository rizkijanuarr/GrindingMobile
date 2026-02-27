import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCreatePostViewModel } from './CreatePostViewModel';
import { styles } from './CreatePostStyle';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const {
    createState,
    title,
    setTitle,
    content,
    setContent,
    image,
    pickImage,
    handleSubmit,
  } = useCreatePostViewModel();

  return (
    <View style={styles.container}>
      {/* Form Upload Post */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Tambah Post Baru</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.previewImage} />
          ) : (
            <Text style={styles.imagePickerText}>Pilih Gambar</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Judul"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Konten"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmit(() => navigation.goBack())}
          disabled={createState.status === 'loading' || !title || !content}
        >
          {createState.status === 'loading' ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Upload Post</Text>
          )}
        </TouchableOpacity>
        {/* Error message */}
        {createState.status === 'error' && (
          <Text style={styles.error}>{createState.message}</Text>
        )}
      </View>
    </View>
  );
};

export default CreatePostScreen;
