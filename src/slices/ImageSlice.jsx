import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
    const stored = localStorage.getItem("storedImages")
    return stored ? JSON.parse(stored) : [];
}

const initialState = {
    storedImages: loadFromLocalStorage(),
}

export const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        toggleImage: (state, action) => {
            const image = action.payload;
            const exists = state.storedImages.find((img) => img.id === image.id)

            if(exists){
                state.storedImages = state.storedImages.filter((img) => img.id !== image.id);
            }else{
                state.storedImages.push(image);
            }

            localStorage.setItem("storedImages", JSON.stringify(state.storedImages));
        }
    }
})
export const { toggleImage } = imageSlice.actions;
export default imageSlice.reducer;