import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ImageDisplayProps {
  imageUri: string;
  title: string;
  description: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUri, title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Image 
        source={{ uri: imageUri }} 
        style={styles.image}
        resizeMode="contain"
      />
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
});
