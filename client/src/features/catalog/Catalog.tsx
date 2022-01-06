import { useState, useEffect } from "react";
import {Product} from "../../app/models/product";
import ProductList from "./ProductList";
import Button from "@mui/material/Button";
import agent from "../../app/api/agent"
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ServerError from "../../app/errors/ServerError";

/*interface Props {
    products: Product[];
    addProduct: () => void;
}*/

export default function Catalog() {

    //const [products, setProducts] = useState<Product[]>([]);
    
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();

    //const [loading, setLoading] = useState(true);

    useEffect(()=> {
        /*agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));*/

        if (!productsLoaded) dispatch(fetchProductsAsync());

      }, [productsLoaded, dispatch])

      if (status.includes('pending')) return <LoadingComponent message='Loading products...'/>

      if (products.length === 0) return <ServerError />

    
    //   function addProduct() {
    //     setProducts(prevState => [...prevState, 
    //       {
    //         id: prevState.length + 101,
    //         name:"product " +(prevState.length + 1),
    //         price: 4560.00,
    //         brand: 'some brand',
    //         description: 'some description',
    //         pictureUrl: 'http'
    //       }])
    //   }

    return (
        <>
            <ProductList products ={products}/>
            {/* <Button variant='contained' onClick={addProduct}>Add product</Button> */}
        </>
    )
}