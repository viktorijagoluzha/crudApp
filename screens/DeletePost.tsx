import React from 'react';
import {View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useDispatch} from 'react-redux';
import {deletePost} from '../features/postsSlice';
import Title from '../components/Title';
import {NEW_BLUE} from '../styles/colors';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

interface DeletePostProps {
  post: {id: number; title: string; body: string};
  isVisible: boolean;
  onClose: () => void;
}

const DeletePost: React.FC<DeletePostProps> = ({post, isVisible, onClose}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  const handleDeleteButtonClick = () => {
    dispatch(deletePost(post.id));
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Title
          data={'Confirm Deletion'}
          marginBottom={10}
          fontStyle="bold"
          size="xxl"
          lineHeight={40}
          color="gray"
        />
        <Title data={post.title} marginBottom={5} fontStyle="bold" size="md" />
        <Title data={post.body} marginBottom={15} fontStyle="bold" size="md" />

        <View style={styles.buttonContainer}>
          <CustomButton title="Delete Post" onPress={handleDeleteButtonClick} />
          <TouchableOpacity onPress={onClose}>
            <Title
              data={'Cancel'}
              fontStyle="bold"
              size="md"
              color="blue"
              marginTop={8}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: NEW_BLUE,
    borderWidth: 8,
    marginVertical: 150,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});

export default DeletePost;
