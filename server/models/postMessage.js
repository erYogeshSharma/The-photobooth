import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title:String,
    message: String,
    creator: String,
    name: String,
    selectedFile: String,
    tags:[String],
    likes: {
        type:[String],
        default:[],
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('postMessage', postSchema);

export default PostMessage;