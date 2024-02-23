import mongoose, {Schema, model, models} from "mongoose";
import { Shard } from "./Shard";
import { Collection } from "./Collection";


const userSchema = new Schema({
name: {
    type: String,
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
    type: [Schema.Types.UUID],
    ref: "Shard",
    default: []
},
collections: {
    type: [Schema.Types.UUID],
    ref: "Collection",
    default: []
},
// followers: [{
//     type: Schema.Types.ObjectId,
//     ref: 'User'
// }],
// following: [{
//     type: Schema.Types.ObjectId,
//     ref: 'User'
// }]
}, {
    timestamps: true
});

export const User =  models?.User || model("User", userSchema);

