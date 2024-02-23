import mongoose, {Schema, models, model} from "mongoose";

const collectionSchema = new Schema({
    _id: Schema.Types.UUID, 
title: {
    type:String,
    required: [true, "Collection Title not found"],
},
description: String,
creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
},
shards: {
type: [Schema.Types.UUID],
ref: "Shard",
default: []
},
likes: {
    type: Number,
    default: 0,
},
views: {
    type: Number,
    default: 0,
},
// comments: {
//     type: [Schema.Types.ObjectId],
//     ref: "Comment",
//     default: []
// },

type: {
    type :String,
    enum: ['public', 'private']
}

});

 export const Collection =  models?.Collection || model("Collection", collectionSchema);
