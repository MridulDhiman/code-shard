import mongoose,  {Schema, models, model} from "mongoose";


const commentSchema = new Schema({
user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
},
message: {
    type: String,
    required: true
},
threadId: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
},
parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null   
}
});


 export const Comment  =  models?.Comment || model("Comment", commentSchema);
