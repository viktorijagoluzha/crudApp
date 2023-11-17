import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import CustomButton from '../components/CustomButton';
import {updatePost} from '../features/postsSlice';
import Title from '../components/Title';

type RootStackParamList = {
  ViewPost: {item: {id: number; title: string; body: string}};
};

type ViewPostScreenRouteProp = RouteProp<RootStackParamList, 'ViewPost'>;

interface ViewPostScreenProps {
  route: ViewPostScreenRouteProp;
}

const ViewPost: React.FC<ViewPostScreenProps> = ({route, navigation}: any) => {
  const {item} = route.params;
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item?.title);
  const [editedBody, setEditedBody] = useState(item?.body);

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  const handleSaveButtonClick = () => {
    dispatch(updatePost({id: item.id, title: editedTitle, body: editedBody}));
    setEditMode(false);
  };

  const logout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Details</Text>
      {editMode ? (
        <>
          <TextInput
            value={editedTitle}
            onChangeText={text => setEditedTitle(text)}
            style={styles.input}
            placeholder="Enter title"
          />
          <TextInput
            value={editedBody}
            onChangeText={text => setEditedBody(text)}
            style={[styles.input, styles.bodyInput]}
            placeholder="Enter body"
            multiline={true}
            numberOfLines={4}
          />
          <CustomButton
            title="Save"
            width={300}
            marginBottom={12}
            onPress={handleSaveButtonClick}
          />
        </>
      ) : (
        <>
          <Title
            data={editedTitle}
            size="xl"
            lineHeight={30}
            width={300}
            color="green"
          />

          <Title
            data={editedBody}
            size="customMd"
            lineHeight={30}
            width={300}
          />
          <CustomButton
            title="Edit"
            width={300}
            marginTop={16}
            onPress={handleEditButtonClick}
          />
        </>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  postDetail: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 8,
    width: 300,
    paddingHorizontal: 10,
    borderRadius: 1,
  },
  bodyInput: {
    height: 90,
    textAlignVertical: 'top',
  },
});

export default ViewPost;
