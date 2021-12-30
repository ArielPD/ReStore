import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

import { Product } from "../../app/models/product";
import { CardHeader, Typography, Card, CardActions, CardMedia, CardContent, Button } from "@mui/material";

interface Props {
    product: Product
}

const ProductCard = ({product}: Props) => {

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
                    ${(product.price/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button  size="small">Add to cart</Button>
                <Button  size="small">View</Button>
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