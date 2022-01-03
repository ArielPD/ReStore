import { useState, useEffect } from "react";
import {Product} from "../../app/models/product";
import ProductList from "./ProductList";
import Button from "@mui/material/Button";
import agent from "../../app/api/agent"
import LoadingComponent from "../../app/layout/LoadingComponent";

/*interface Props {
    products: Product[];
    addProduct: () => void;
}*/

export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        // fetch('http://localhost:5000/api/products')
        // .then(response => response.json())
        // .then(data => setProducts(data))
        agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
      }, [])

      if (loading) return <LoadingComponent message='Loading products...'/>
    
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