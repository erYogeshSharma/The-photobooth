import React, {useState, useEffect} from 'react'
import { Link, useNavigate,useLocation} from 'react-router-dom';
import {AppBar ,Container,  Typography, Toolbar, Button, Avatar} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import photobooth from '../../images/photobooth.png'
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const  [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
 // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect  (() => {
    const token = user?.token;
    if(token){
      const decodeToken = decode(token);
      if(decodeToken.exp * 1000 < new Date().getTime()) logOut();
    }
     

    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location ]);

  const logOut = ( ) => {
    dispatch({type:'LOGOUT'});
    navigate('/');
    setUser(null);
  };

   
  
  return (
     
     <Container disableGutters maxWidth={false} >

    <AppBar className={classes.appBar} position="relative"  >
      <div className={classes.brandContainer}>
        <img className={classes.image} src={photobooth} alt="icon" height="60" />
        <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center"> &nbsp; ThePhotobooth</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">&nbsp; {user?.result.name} &nbsp;</Typography>
            <Button variant="contained" color="secondary" onClick={logOut}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
     </Container>
     
  );
};

export default Navbar;
 