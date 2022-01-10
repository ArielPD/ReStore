import { Avatar, Container, Paper, Typography, Box, TextField, FormControlLabel, Checkbox, Button, Grid, Alert, AlertTitle, List, ListItem, ListItemText } from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {

    //const history = useHistory();
    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState:{isSubmitting, errors, isValid}} = useForm({
        mode: 'all'
    });

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach( (error : string) => {
                if (error.includes('Password')) {
                    setError('password', {message: error})
                } else if (error.includes('Email')) {
                    setError('email', {message: error})
                } else if (error.includes('Username')) {
                    setError('username', {message: error})
                } 
            })
        }
    }


    return (
        <Container component={Paper} maxWidth="sm" 
            sx={{display: 'flex', flexDirection:'column', alignItems: 'center', p: 4}}>
            <Avatar sx={{m:1, bgcolor:'secondary.main'}}>
                <AccountCircleOutlined />
            </Avatar>
            <Typography>
                Register
            </Typography>
            <Box component="form" 
                onSubmit={handleSubmit((data) => 
                    agent.Account.register(data)
                    .then(() => {
                        toast.success('Registration succssful - you can now login');
                        navigate('/login');
                    })
                    .catch(error => handleApiErrors(error)))}
                noValidate sx={{mt: 1}}>   
                <TextField
                    margin="normal"
                    fullWidth
                    label="UserName"
                    autoFocus
                    {...register('username', {required: 'Username is required'})}
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                />
                 <TextField
                    margin="normal"
                    fullWidth
                    label="Email address"
                    {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                            message: 'Not a valid email address'
                        } 
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />
                 <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', { 
                        required: 'Password is required',
                        pattern: {
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: 'Password is not complex enough'
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                />
            
                <LoadingButton 
                     loading={isSubmitting}
                     disabled={!isValid}
                     type="submit" 
                     fullWidth 
                     variant="contained" sx={{mt: 3, mb: 2}}>
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/login">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Register;