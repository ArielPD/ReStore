import { useState, useEffect } from "react";
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Button } from "@mui/material";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {Order} from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import OrderDetailed from "./OrderDetailed";

export default function OrderPage() {

    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

    useEffect(() => {
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return <LoadingComponent message="Loading orders..."/>

    if (selectedOrderNumber > 0) return (
           <OrderDetailed
                order = {orders?.find(o => o.id === selectedOrderNumber)!}
                setSelectedOrder = {setSelectedOrderNumber}
           />
        ) 

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order number</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Order Status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map(orderData => (
                        <TableRow
                            key={orderData.id}
                        >
                            <TableCell component="th" scope="row">{orderData.id}</TableCell>
                            <TableCell align="right">{currencyFormat(orderData.total)}</TableCell>
                            <TableCell align="right">{orderData.orderDate.split('T')[0]}</TableCell>
                            <TableCell align="right">{orderData.orderStatus}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => setSelectedOrderNumber(orderData.id)}>View</Button>
                            </TableCell>
                            
                        </TableRow>                     
                    ))

                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}