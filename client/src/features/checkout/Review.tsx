import { Typography, Grid, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/store/configureStore'
import BasketSummary from '../basket/BasketSummary'
import BasketTable from '../basket/BasketTable'

const Review = () => {
    const {basket} = useAppSelector(state => state.basket);
    return (
        <>
            <Typography>
                Order summary
            </Typography>
            {basket && 
            <BasketTable items={basket.items} isBasket={false} />}
            <Grid container>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                    <BasketSummary />
                </Grid>
            </Grid>
        </>
    )
}

export default Review
