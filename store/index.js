

import { configureStore } from "@reduxjs/toolkit";
import { shardReducer } from "./slices/shard";


export const store = configureStore({
reducer: {shard: shardReducer}
});