
import { Schema, model, models } from "mongoose";
import { fileSchema } from "./File.js";
import { dependencySchema } from "./Dependency.js";
import { User } from "./User.js";

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
        required: false,
        default: ""
    },
    css: {
        type: String,
        required: false,
        default: ""
    },
    js: {
        type: String,
        required: false,
        default: ""
    },
    isTemplate: {
        type: Boolean,
        required: true,
        default: false,
    },
    templateType: String,
    files: [fileSchema], 
    dependencies: [dependencySchema],
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
   likedBy: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref:"User"
   }
}, {
    timestamps: true,
});





shardSchema.pre("save", function (next) {
    if(this.isTemplate) {
        this.html = undefined;
        this.css = undefined;
        this.js = undefined;
    }
    else {
        this.templateType = undefined;
        this.files = undefined;
        this.dependencies = undefined;    
    }

    next()
});

export const Shard =  models?.Shard || model("Shard", shardSchema);








