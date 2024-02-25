import mongoose, { Schema, model, models } from "mongoose";
import { User } from "./User";

const shardSchema = new Schema({
    _id : Schema.Types.UUID,
    title: {
       type: String,
       default : "Untitled"
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    html: {
        type: String, 
        default: ""
    },
    css: {
            type: String,
            default: ""
    },
    js: {
        type: String,
        default: ""
    },
    tags: [String],
    type: {
        type: String,
        default: 'public',
        enum: ['public', 'private', 'forked']
    },
    mode: {
   type: String,
   default: "normal",
   enum: ['normal',"collaboration"]
    },
    likes: {
        type: Number,
        default: 0
    },
    // comments: {
    //     type: [Schema.Types.ObjectId],
    //     ref: "Comment",
    //     default: []
    // }
}, {
    timestamps: true,
    discriminatorKey: 'kind'
});




export const Shard =  models?.Shard || model("Shard", shardSchema);



// const forkedShardSchema = new Schema({
// forkedFrom: {
//     type: Schema.Types.ObjectId,
//     ref: "User"
// }
// }, {
//     discriminatorKey: "kind"
// });

// export const ForkedShard = models?.ForkedShard || Shard.discriminator("ForkedShard",  forkedShardSchema);

