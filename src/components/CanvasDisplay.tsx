import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Canvas,
  ImageShader,
  SkImage,
  Fill,
  Group,
  Image as SkiaImage,
} from '@shopify/react-native-skia';

interface CanvasDisplayProps {
  skiaImage: SkImage;
  title: string;
  description: string;
  renderType: 'shader' | 'image';
}

export const CanvasDisplay: React.FC<CanvasDisplayProps> = ({ 
  skiaImage, 
  title, 
  description,
  renderType 
}) => {
  const renderCanvas = () => {
    if (renderType === 'shader') {
      return (
        <Canvas style={styles.canvas} colorSpace='p3'>
          <Group>
            <Fill />
            <ImageShader
              image={skiaImage}
              fit="contain"
              rect={{ x: 0, y: 0, width: 300, height: 300 }}
            />
          </Group>
        </Canvas>
      );
    }

    return (
      <Canvas style={styles.canvas} colorSpace='p3'>
        <SkiaImage
          image={skiaImage}
          fit="contain"
          x={0}
          y={0}
          width={300}
          height={300}
        />
      </Canvas>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {renderCanvas()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    lineHeight: 18,
  },
  canvas: {
    width: 300,
    height: 300,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
