import { Schema, model, models } from "mongoose";
import { User } from "./User";
import connectToDB from "@/lib/database";



const shardSchema = new Schema({

    title: {
       type: String,
       default : "Untitled"
    },
    creator: {
      type: String,
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
    
});




export const Shard =  models?.Shard || model("Shard", shardSchema);






