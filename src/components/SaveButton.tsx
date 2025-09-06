import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface SaveButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onPress, isLoading = false }) => {
  return (
    <View style={styles.container}>
      <Button 
        title={isLoading ? "Saving..." : "Save Image via Skia MakeOffscreen"} 
        onPress={onPress} 
        color="#FF6B6B"
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});
