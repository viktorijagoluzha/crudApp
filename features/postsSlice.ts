import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts',
  );
  return response.data;
});

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;
  },
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (newPost: Post) => {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      newPost,
    );
    return response.data;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [] as Post[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
    updatePost: (state, action) => {
      const {id, title, body} = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === id);
      if (postIndex !== -1) {
        state.posts[postIndex] = {id, title, body};
      }
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    delPost: (state, action) => {
      const postIdToDelete = action.payload;
      state.posts = state.posts.filter(post => post.id !== postIdToDelete);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const {updatePost} = postsSlice.actions;
export const {addPost} = postsSlice.actions;
export const {delPost} = postsSlice.actions;
export default postsSlice.reducer;
