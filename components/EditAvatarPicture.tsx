import React, {useEffect, useState} from 'react';
import {Image, Modal, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {setSelectedImage, selectImage} from '../features/avatarEditSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from './CustomButton';
import Title from './Title';

interface EditAvatarPictureProps {
  disabled?: boolean;
  showTitle?: boolean;
}

const EditAvatarPicture: React.FC<EditAvatarPictureProps> = ({
  disabled = false,
  showTitle = true,
}) => {
  const [isModalVisible, setIsVisible] = useState<boolean>(false);
  const selectedImage = useSelector(selectImage);
  const dispatch = useDispatch();

  useEffect(() => {
    const retrieveImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('selectedImage');
        if (storedImage) {
          dispatch(setSelectedImage(storedImage));
        }
      } catch (error) {
        console.error('Error retrieving image from AsyncStorage:', error);
      }
    };

    retrieveImage();
  }, [dispatch]);

  const saveImageToStorage = async (imageUri: string | undefined) => {
    try {
      if (imageUri) {
        await AsyncStorage.setItem('selectedImage', imageUri);
        dispatch(setSelectedImage(imageUri));
      }
    } catch (error) {
      console.error('Error saving image to AsyncStorage:', error);
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const imageUri = response.assets && response.assets[0]?.uri;
        saveImageToStorage(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const imageUri = response.assets && response.assets[0]?.uri;
        saveImageToStorage(imageUri);
      }
    });
  };

  const handlePress = () => {
    if (!disabled) {
      setIsVisible(true);
    }
  };

  const handleGalleryPress = () => {
    setIsVisible(false);
    openImagePicker();
  };

  const handleCameraPress = () => {
    setIsVisible(false);
    handleCameraLaunch();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            {showTitle && (
              <Title data={'Select Image'} color="violet" size="sm" />
            )}
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        onRequestClose={() => setIsVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomButton
              title={'Choose from Gallery'}
              width={200}
              marginBottom={12}
              onPress={() => handleGalleryPress()}
            />
            <CustomButton
              title={'Take a Photo'}
              width={200}
              onPress={() => handleCameraPress()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 175,
    borderColor: 'grey',
    borderWidth: 4,
  },
  placeholder: {
    width: 250,
    height: 250,
    borderRadius: 175,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default EditAvatarPicture;
