import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useImageLoader } from './src/hooks/useImageLoader';
import { useImageSaver } from './src/hooks/useImageSaver';
import { ImageDisplay } from './src/components/ImageDisplay';
import { CanvasDisplay } from './src/components/CanvasDisplay';
import { SaveButton } from './src/components/SaveButton';
import { appStyles } from './src/styles/appStyles';

export default function App() {
  const { skiaImage, imageUri, isLoading, error } = useImageLoader();
  const { isSaving, saveImage } = useImageSaver();

  const handleSaveImage = () => {
    saveImage(skiaImage);
  };

  return (
    <ScrollView style={appStyles.container}>
      <Text style={appStyles.title}>P3 Color Space Demo</Text>
      <Text style={appStyles.subtitle}>Issue #3350</Text>

      <SaveButton onPress={handleSaveImage} isLoading={isSaving} />

      {imageUri && (
        <ImageDisplay 
          imageUri={imageUri} 
          title="P3 Image rendered by RN" 
          description="Renders correctly with P3 color profile and displays vibrant colors as expected."
        />
      )}

      {skiaImage && (
        <CanvasDisplay 
          skiaImage={skiaImage} 
          title="P3 Image rendered by Skia (ImageShader)" 
          description="Renders in sRGB color space despite P3 being enabled, resulting in duller colors."
          renderType="shader"
        />
      )}

      {skiaImage && (
        <CanvasDisplay 
          skiaImage={skiaImage} 
          title="P3 Image rendered by Skia (Image)" 
          description="Renders in sRGB color space despite P3 being enabled, resulting in duller colors."
          renderType="image"
        />
      )}
    </ScrollView>
  );
}