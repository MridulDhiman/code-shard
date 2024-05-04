import { createSlice } from "@reduxjs/toolkit";


const sandpackSlice = createSlice({
initialState: {
    fileName: ""
},
});


export const {
reducer: sandpackReducer
} = sandpackSlice;