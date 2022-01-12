import { ComponentType } from "react";
import { Route, RouteProps, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppSelector } from "../store/configureStore";

const PrivateRoute = ({ path }: RouteProps) => {
  const { user } = useAppSelector(state => state.account);
  const navigate = useNavigate();
  if (!user) {
    return navigate('/login');
  }

  return (<Route path='/checkout' element={<CheckoutPage/>}/>);
};

export default PrivateRoute;






