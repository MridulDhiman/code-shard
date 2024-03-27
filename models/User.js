import mongoose, {Schema, model, models} from "mongoose";
import { Shard } from "./Shard";
import { Collection } from "./Collection";


const userSchema = new Schema({
name: {
    type: String,
    unique: true,
    required: true
},
email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
shards: {
    type: [Schema.Types.ObjectId],
    ref: "Shard",
    default: []
},

collections: {
    type: [Schema.Types.ObjectId],
    ref: "Collection",
    default: []
}, 
followers: {
    type: [String],
    default: []
}, 
following: {
    type: [String],
    default: []
}
}, {
    timestamps: true
});



export const User =  models?.User || model("User", userSchema);
