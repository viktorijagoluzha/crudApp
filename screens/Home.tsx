import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {fetchPosts} from '../features/postsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/userStore';
import {useFocusEffect} from '@react-navigation/native';
import Title from '../components/Title';
import DeletePost from './DeletePost';

interface HomeScreenProps {}

const Home: React.FC<HomeScreenProps> = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  const [selectedPost, setSelectedPost] = useState<{
    id: number;
    title: string;
    body: string;
  } | null>(null);

  const [isDeletePostModalVisible, setDeletePostModalVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());

      console.log('POSTS ', posts);
    }
  }, [status, dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, []),
  );
  const handleDeletePost = (postId: number) => {
    console.log('DELETE', postId);

    const selectedPost = posts.find(post => post.id === postId);

    const postToDelete = selectedPost || null;

    setSelectedPost(postToDelete as null);
    setDeletePostModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedPost(null);
    setDeletePostModalVisible(false);
  };

  const handleItemPress = (item: {id: number; title: string; body: string}) => {
    navigation.navigate('ViewPost', {item});
  };

  const renderItem = ({
    item,
  }: {
    item: {id: number; title: string; body: string};
  }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: 40,
          alignItems: 'center',
        }}>
        <View style={styles.item}>
          <Title
            data={item.title}
            size="xxl"
            lineHeight={30}
            width={300}
            color="green"
          />
          <Title data={item.body} size="customMd" width={200} />
        </View>
        <TouchableOpacity onPress={() => handleDeletePost(item.id)}>
          <Image
            source={require('../assets/icons/crossRed.jpg')}
            style={{width: 30, height: 30, marginHorizontal: 4}}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (status === 'loading') {
    return (
      <View>
        <Title data={'Loading...'} />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View>
        <Title data={'Error:'} /> {error}
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => (item.id ?? '').toString()}
      />
      {selectedPost && (
        <DeletePost
          post={selectedPost}
          isVisible={isDeletePostModalVisible}
          onClose={handleModalClose}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    justifyContent: 'center',
  },
});
