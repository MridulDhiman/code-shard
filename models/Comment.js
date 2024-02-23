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
// replies: [{
//     type: Schema.Types.ObjectId,
//     ref: "Comment"
// }]
});


 export const Comment  =  models?.Comment || model("Comment", commentSchema);
