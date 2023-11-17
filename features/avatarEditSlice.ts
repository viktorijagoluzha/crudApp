import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AvatarImageState {
  selectedImage: string | undefined;
}

const initialState: AvatarImageState = {
  selectedImage: undefined,
};

const imageSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setSelectedImage: (state, action: PayloadAction<string | undefined>) => {
      state.selectedImage = action.payload;
    },
  },
});

export const {setSelectedImage} = imageSlice.actions;
export const selectImage = (state: {avatar: AvatarImageState}) =>
  state?.avatar?.selectedImage;
export default imageSlice.reducer;
