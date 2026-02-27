import { useState, useCallback } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { launchImageLibrary } from 'react-native-image-picker';
import { UiState } from '../../../core/common/UiState';
import { BASE_URL } from '../../../core/common/Constant';

export const useCreatePostViewModel = () => {
  const [createState, setCreateState] = useState<UiState<any>>(UiState.idle());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<any>(null);

  // Helper: Show native Android Toast atau iOS Alert
  const showToast = useCallback((message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      //
    }
  }, []);

  const pickImage = useCallback(async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.assets && response.assets.length > 0) {
          setImage(response.assets[0]);
        }
      },
    );
  }, []);

  const createPost = useCallback(
    async () => {
      setCreateState(UiState.loading());

      try {
        const url = `${BASE_URL}/posts`;

        // Prepare multipart data
        const formData: any[] = [
          { name: 'title', data: title },
          { name: 'content', data: content },
        ];

        // Add image if exists
        if (image && image.uri) {
          const imageUri =
            Platform.OS === 'android'
              ? image.uri.replace('file://', '')
              : image.uri;

          formData.push({
            name: 'image',
            filename: image.fileName || 'photo.jpg',
            type: image.type || 'image/jpeg',
            data: RNFetchBlob.wrap(imageUri),
          });
        }

        // Logging (seperti NetworkModule)
        if (__DEV__) {
          console.log(`[HTTP POST] ${url}`);
          console.log('[HTTP Headers]', {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            'ngrok-skip-browser-warning': '69420',
          });
          console.log('[HTTP Body] FormData (multipart):', {
            title,
            content,
            image: image ? `${image.fileName} (${image.type})` : 'none',
          });
        }

        // Upload via rn-fetch-blob (native multipart support)
        const response = await RNFetchBlob.fetch(
          'POST',
          url,
          {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
          formData,
        );

        const responseData = response.json();

        // Response logging (seperti NetworkModule)
        if (__DEV__) {
          console.log(`[HTTP Response] ${response.info().status} ${url}`);
          console.log('[HTTP Response Data]', responseData);
        }

        if (response.info().status === 200 || response.info().status === 201) {
          setCreateState(UiState.success(responseData));
          return true; // Berhasil
        } else {
          throw new Error(responseData?.message || 'Upload gagal');
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Gagal membuat post';
        setCreateState(UiState.error(message));
        console.error('[CreatePostViewModel] Upload error:', message);
        return false; // Gagal
      }
    },
    [title, content, image],
  );

  const handleSubmit = useCallback(async (onSuccess: () => void) => {
    if (!title || !content || !image) {
      showToast('Title, content, dan gambar wajib diisi');
      return;
    }

    const success = await createPost();

    if (success) {
      showToast('Post berhasil dibuat!');
      onSuccess();
    } else {
      showToast('Gagal membuat post');
    }
  }, [title, content, image, createPost, showToast]);

  return {
    createState,
    title,
    setTitle,
    content,
    setContent,
    image,
    pickImage,
    handleSubmit,
  };
};
