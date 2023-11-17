import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomButton from '../components/CustomButton';
import {addPost} from '../features/postsSlice';
import Title from '../components/Title';
import { useNavigation } from '@react-navigation/native';

interface CreatePostProps {
  navigation: any;
}

const CreatePost: React.FC<CreatePostProps> = () => {
  const dispatch = useDispatch();
   const navigation = useNavigation()
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const handleCreateButtonClick = () => {
    dispatch(addPost({
      title: newTitle, body: newBody,
      id: 0
    }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Title
        data={'Create New Post'}
        fontStyle="bold"
        marginBottom={20}
        size="xxl"
        lineHeight={40}
      />
      <TextInput
        value={newTitle}
        onChangeText={text => setNewTitle(text)}
        placeholder="Enter title"
        style={styles.input}
      />
      <TextInput
        value={newBody}
        onChangeText={text => setNewBody(text)}
        placeholder="Enter body"
        style={[styles.input, styles.bodyInput]}
        multiline={true}
        numberOfLines={4}
      />
      <CustomButton
        title="Create"
        width={300}
        onPress={handleCreateButtonClick}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.cancelButton}>
        <Title data={'Cancel'} fontStyle="bold" marginTop={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },

  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 8,
    width: 300,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  bodyInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  cancelButton: {
    marginTop: 20,
  },
});

export default CreatePost;
