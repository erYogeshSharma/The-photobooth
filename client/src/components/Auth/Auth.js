import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';
import Icon from './icon';
import {signin , signup} from "../../actions/auth";

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}
 
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setIsSignup((previsSignup) => !previsSignup)
        setShowPassword(false);
    }

    const handleChange = (e) => {
          setFormData({ ...formData , [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
         e.preventDefault()
        console.log(formData); 
        if (isSignup) {
            dispatch(signup(formData, navigate));
            
        } else {
            dispatch(signin(formData, navigate));
            
        }
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; //cannot get property profileObj of undefined  undefinded
        const token = res?.tokenId;
        try {
             dispatch({ type: 'AUTH', data: {result, token}});
             navigate('/');
        } catch (error) {
            console.log(error);
            
        }
    }
    const googleFaliure = (error) => {
        console.log(error);
        console.log('Google sign in was unsuccessful. Try again later');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign In' : 'Sign In'}</Typography>
                <form className={classes.form}  >
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>

                            )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} />}
                    </Grid>
                    <Button type="submit " fullWidth variant="contained" color="primary" className={classes.submit} onClick= {handleSubmit} >  
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId = '625557725056-fij5s39hguj9jn56sb4bedei1bgufg7k.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} fullWidth color='primary' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                    onSuccess = {googleSuccess}
                    onFailure = {googleFaliure}
                    cookiePolicy="single_host_origin"


                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}> {isSignup ? "Already have a account ? sign in" : " New to photoBooth? Sign Up"} </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
