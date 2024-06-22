
import { Schema, model, models } from "mongoose";

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
    files: Schema.Types.Mixed, 
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


shardSchema.pre("save", function (next) {
  
    if(this.isTemplate) {
        this.html = undefined;
        this.css = undefined;
        this.js = undefined;
    }
    else {
        this.templateType = undefined;
        this.files = undefined;
    }

    next()
});



// USAGE: const {status} =  await Shard.updateTemplate(id, files);
shardSchema.statics.updateTemplate =  function (id, files) {
    return new Promise(async (resolve, reject) => {
        try {
            await this.updateOne({_id: id, isTemplate: true}, {
               files
            });

            resolve({"status" : "200"});
           } catch (error) {
             reject({"status": "500"});
             console.log("Could not update template: ", id,  error);
           }
    });
}

export const Shard =  models?.Shard || model("Shard", shardSchema);






