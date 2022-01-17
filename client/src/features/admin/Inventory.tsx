import {useEffect, useState} from "react";
import { Delete, Edit, FormatListBulletedOutlined } from "@mui/icons-material";
import { Box, Button, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import useProducts from "../../app/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import AppPagination from "../../app/components/AppPagination";
import { removeProduct, setPageNumber } from "../catalog/catalogSlice";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import {LoadingButton} from "@mui/lab";

export default function Inventory() {
    const {products, metaData} = useProducts(); 
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined); 
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    const {user} = useAppSelector(state => state.account);
    const navigate = useNavigate();
    useEffect(() => {
        if (user == null)
            navigate('/login');
    }, [user])

    function handleSelectProduct(product: Product){
        setSelectedProduct(product);
        setEditMode(true);
    }

    function handleDeleteProduct(id: number) {
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
            .then(() => dispatch(removeProduct(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    function cancelEdit() {
        if (selectedProduct) setSelectedProduct(undefined);
        setEditMode(false);
    }

    if (editMode) return <ProductForm product={selectedProduct} cancelEdit={cancelEdit} />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
               <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
               <Button onClick={() => setEditMode(true)} sx={{m:2}} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map((product) =>(
                                <TableRow
                                    key={product.id}
                                >
                                    <TableCell>
                                        {product.id}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Box display='flex' alignItems='center'>
                                            <img src={product.pictureUrl} alt={product.name} style={{height: 50, marginRight: 20}}/>
                                            <span>{product.name}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">{currencyFormat(product.price)}</TableCell>
                                    <TableCell align="center">{product.type}</TableCell>
                                    <TableCell align="center">{product.brand}</TableCell>
                                    <TableCell align="center">{product.quantityInStock}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />}/>
                                        <LoadingButton 
                                            loading={loading && target === product.id}
                                            startIcon={<Delete />} color='error'
                                            onClick={() => handleDeleteProduct(product.id)}/>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {metaData && 
                <Box sx={{pt: 2}}>
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                    />
                </Box>
            }
        </>
    )
}