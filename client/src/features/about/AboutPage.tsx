import {useState} from "react";
import {Container, Typography, ButtonGroup, Button, Alert, AlertTitle, List, ListItem, ListItemText } from "@mui/material"
import agent from '../../app/api/agent';

const AboutPage = () => {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        console.log('getValidationError')
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => setValidationErrors(error));
    }

    return (
        <Container>
            <Typography variant='h2'>
                Errors for testing purposes
            </Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
                {/* <Button variant='contained' onClick={() => agent.TestErrors.getValidationError().catch(error => console.log(error))}>Test Validation Error</Button> */}
                <Button variant='contained'
                 onClick={getValidationError}>Test Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 && 
                <Alert severity='error'>
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {
                            validationErrors.map(error => (
                                <ListItem key={error}>
                                    <ListItemText>{error}</ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                </Alert>
            }
        </Container>
    )
}

export default AboutPage
