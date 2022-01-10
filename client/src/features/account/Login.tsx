import { Avatar, Container, Paper, Typography, Box, TextField, FormControlLabel, Checkbox, Button, Grid } from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

const Login = () => {

    //const history = useHistory();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState:{isSubmitting, errors, isValid}} = useForm({
        mode: 'all'
    });

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            navigate('/catalog');
        } catch (error) {
            console.log(error);
        }
        
    }


    return (
        <Container component={Paper} maxWidth="sm" 
            sx={{display: 'flex', flexDirection:'column', alignItems: 'center', p: 4}}>
            <Avatar sx={{m:1, bgcolor:'secondary.main'}}>
                <AccountCircleOutlined />
            </Avatar>
            <Typography>
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt: 1}}>
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
                    label="Password"
                    type="password"
                    {...register('password', {required: 'Password is required'})}
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                />
                <LoadingButton 
                     loading={isSubmitting}
                     disabled={!isValid}
                     type="submit" 
                     fullWidth 
                     variant="contained" sx={{mt: 3, mb: 2}}>
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/register">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Login;