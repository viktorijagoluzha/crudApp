import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSelectedImage = async (imageUri: string) => {
  try {
    await AsyncStorage.setItem('selectedImage', imageUri);
  } catch (error) {
    console.error('Error saving selected image to AsyncStorage:', error);
  }
};

export const getSelectedImage = async () => {
  try {
    const storedImage = await AsyncStorage.getItem('selectedImage');
    return storedImage;
  } catch (error) {
    console.error('Error retrieving selected image from AsyncStorage:', error);
    return null;
  }
};
