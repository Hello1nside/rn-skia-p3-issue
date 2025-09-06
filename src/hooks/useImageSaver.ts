import { useState } from 'react';
import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { SkImage, ImageFormat } from '@shopify/react-native-skia';
import { ImageEffectHandler } from '../utils/handlers/ImageEffectHandler';
import { shader } from '../utils/shaders/shader';

export const useImageSaver = () => {
  const [isSaving, setIsSaving] = useState(false);

  const saveImage = async (skiaImage: SkImage | null) => {
    if (!skiaImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    try {
      setIsSaving(true);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to save images');
        return;
      }

      console.log('Starting offscreen render with Skia...');

      // Create ImageEffectHandler with the simple shader
      const imageEffectHandler = new ImageEffectHandler(shader);
      
      // Process image through offscreen rendering
      const processedImage = await imageEffectHandler.apply(skiaImage);
      console.log('Image processed via Skia offscreen rendering');

      const base64String = processedImage.encodeToBase64(ImageFormat.PNG, 100);

      if (!base64String) {
        throw new Error('Failed to encode image');
      }

      const fileUri = FileSystem.cacheDirectory + `p3-test-${Date.now()}.png`;
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const asset = await MediaLibrary.createAssetAsync(fileUri);

      await FileSystem.deleteAsync(fileUri);

      Alert.alert('Success', `Image saved to gallery via Skia offscreen\nFile: ${asset.filename}`);
      console.log('Saved image:', asset.uri);

    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save image');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    saveImage,
  };
};
