import { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Skia, SkImage } from '@shopify/react-native-skia';

export const useImageLoader = () => {
  const [skiaImage, setSkiaImage] = useState<SkImage | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDefaultImage = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const defaultAsset = Asset.fromModule(require('../../assets/p3-image.jpeg'));
      await defaultAsset.downloadAsync();
      
      if (defaultAsset.localUri) {
        setImageUri(defaultAsset.localUri);
        
        const base64 = await FileSystem.readAsStringAsync(defaultAsset.localUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        const data = Skia.Data.fromBase64(base64);
        const image = Skia.Image.MakeImageFromEncoded(data);
        
        if (image) {
          setSkiaImage(image);
          console.log('Default P3 image loaded:', image.width(), 'x', image.height());
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error loading default image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDefaultImage();
  }, []);

  return {
    skiaImage,
    imageUri,
    isLoading,
    error,
    reloadImage: loadDefaultImage,
  };
};
