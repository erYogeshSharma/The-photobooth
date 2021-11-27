import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch,useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';




const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });
    const classes = useStyles();
  
    const dispatch = useDispatch();
//const post = useSelector((state) => currentId ? state.posts.find((p ) => p._id === currentId): null);
const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId , {...postData, name:user?.result?.name}));
        }else{

            dispatch(createPost({...postData, name : user?.result?.name}));
        }
        clear();
       
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({  title: '', message: '', tags: '', selectedFile: ''})        
    }
    
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    please sign in to add yout photos to the photobooth.
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant='h6'>{currentId ? 'Editing' : 'Getting'} into Photobooth</Typography>
                
                <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file' multipe={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>submit</Button>
                <Button variant="contained" color="secondary" size="large"   onClick={clear} fullWidth >clear</Button>
            </form>

        </Paper>
    ) 
}
export default Form;