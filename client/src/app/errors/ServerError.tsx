import {Container, Paper, Typography, Divider, Button} from "@mui/material";
//import { useHistory, useLocation} from "react-router-dom";

const ServerError = () => {

   // const history = useHistory();
   // const {state} = useLocation<any>();

    return (
        <Container component={Paper}>
            {/* {state?.error ? (
                <>
                    <Typography variant='h3' color='error' gutterBottom>{state.error.title}</Typography>
                    <Divider />
                    <Typography>{state.error.detail || 'Inernal server error'}</Typography>
                </>
            ) : (
                <Typography variant='h5' gutterBottom>
                    Server error
                </Typography>
            )}
            <Button onClick={() => history.push('/catalog')} >Go back to the store</Button> */}


            <Typography variant='h5' gutterBottom>
                    Server error
                </Typography>

        </Container>
    )
};

export default ServerError;