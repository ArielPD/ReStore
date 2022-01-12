import {useState} from 'react';
import {Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Box, Button} from "@mui/material";
import {Delete, Remove, Add} from "@mui/icons-material";
import agent from "../../app/api/agent";
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from './basketSlice';
import BasketTable from './BasketTable';

const BasketPage = () => {
    
    //const {basket, setBasket, removeItem} = useStoreContext();
    const {basket} = useAppSelector(state => state.basket)

    if(!basket) return <Typography variant='h3'>Your basket is empty</Typography>


    return (
        <>
            <BasketTable items={basket.items}/>
            <Grid container>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default BasketPage;
