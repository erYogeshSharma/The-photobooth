import React,{ useEffect, useState } from 'react'
import { Container,Grid,Grow,Paper,AppBar, TextField, Button } from '@material-ui/core'
import { useNavigate, useLocation } from 'react-router-dom';
 import ChipInput from "material-ui-chip-input";    
import { useDispatch } from 'react-redux';
import Posts from '../posts/posts';
import Form from '../forms/forms';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
 const classes = useStyles();
 const query = useQuery();
  
 const navigate = useNavigate();
 const page = query.get('page') || 1;
 const searchQuery = query.get('searchQuery');
  
 const [search , setSearch] = useState('');
 const [tags , setTags] = useState([]);

  
    
  const handlekeyPress = (e) => {
    if (e.KeyCode === 13) {
     searchPost();
    }
  };
   
  const handleAdd = (tag) => setTags([...tags,tag]);

  const handleDelete = ( tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost =() => {
    if(search.trim() || tags){
          dispatch(getPostsBySearch({ search, tags: tags.join(',')}));
          navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }
    else{
      navigate('/')
    }
  };
  
  return(

      <Grow in>
          <Container maxWidth="xl">
            <Grid container className={classes.mainContainer} justifyContent="space-between" alignitems="stretch" spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField  className={classes.text}
                  name="search"
                  variant="outlined"
                  label="search Photobooth"
                  onKeyPress={handlekeyPress}
                  fullWidth
                  value={search}
                  onChange={(e) =>  setSearch(e.target.value)}  
                />
                

                <ChipInput 
                   style={{ margin: '10px 0'}}
                   value={tags}
                   onAdd={handleAdd}
                   onDelete={handleDelete}
                   label="search tags"
                   variant="outlined"

                />

                <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">Search</Button>
              </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
                {(!searchQuery && !tags.length) && (
                  
                <Paper   elevation={6} className= {classes.pagination}>
                  <Pagination page= {page}  />
                </Paper>
                )}
              </Grid>

            </Grid>
          </Container>
        </Grow>
      )
}

export default Home
