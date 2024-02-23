
import { createSlice } from "@reduxjs/toolkit";

const shardSlice = createSlice({
    name: "shard",
    initialState: {
       title: "",
       html: "",
       css: "",
       js: "",
       id: ""
    },
    reducers: {
       setShard(state, action) {
const input = action.payload;
if(input.title) state.title = input.title;
if(input.html) state.html = input.html;
if(input.css) state.css = input.css;
if(input.js) state.js = input.js;
if (input.id) state.id = input.id;
       }
    }
});


export const {actions: {setShard}, reducer: shardReducer} = shardSlice;