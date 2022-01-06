import {useState} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";

import { Product } from "../../app/models/product";
import { CardHeader, Typography, Card, CardActions, CardMedia, CardContent, Button } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import agent from "../../app/api/agent";
import {useStoreContext} from "../../app/context/StoreContext"
import {currencyFormat} from "../../app/util/util";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";

interface Props {
    product: Product
}

const ProductCard = ({product}: Props) => {
    //const [loading, setLoading] = useState(false);
    const {status} = useAppSelector(state => state.basket);


    //const {setBasket} = useStoreContext();
    const dispatch = useAppDispatch();

    /*function handledAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
             //.then(basket => setBasket(basket))
             .then(basket => dispatch(setBasket(basket)))
             .catch(error => console.log(error))
             .finally(() => setLoading(false))
    }*/

    return (

        <Card>
            <CardHeader 
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={
                    {
                        sx: {fontWeight: 'bold', color: 'primary.main'}
                    }
                }
            />
            <CardMedia 
                sx={{height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    //loading={loading}
                    loading={status.includes('pendingAddItem' + product.id)}
                    // onClick={() => handledAddItem(product.id)}
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                    size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>

        // <ListItem key={product.id}>
        //     <ListItemAvatar>
        //         <Avatar src={product.pictureUrl} />
        //     </ListItemAvatar>
        //     <ListItemText>
        //             {product.name} - {product.price}
        //     </ListItemText>
        // </ListItem>
    );
};

export default ProductCard;