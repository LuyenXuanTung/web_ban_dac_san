import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
import ProductDetails from "../page/ProductDetails";
import HomeAdmin from '../admin/page/HomeAdmin'
import DashBoard from "../admin/page/DashBoard";
import HomePage from "../page/HomePage";
import User from "../admin/page/User";
import Promotion from "../admin/page/Promotion";
import Product from "../admin/page/Product";
import Warehouse from "../admin/page/Warehouse";
import ProductClient from "../page/Product";
import Cart from "../page/Cart";
import Order from "../admin/page/Order";
import MyOrder from "../page/MyOrder";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children:[
          {
            path:'/',
            element: <HomePage />
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
          },
          {
            path: "/product-details/:id",
            element: <ProductDetails />,
          },
          {
            path: "/product",
            element: <ProductClient />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/my-order",
            element: <MyOrder />,
          },
        ]
      },
      {
        path: "/admin",
        element: <HomeAdmin />,
        children: [
          {
            path: "",
            element: <DashBoard />,
          },
          {
            path: "user",
            element: <User />,
          },
          {
            path: "promotion",
            element: <Promotion />,
          },
          {
            path: "product",
            element: <Product />,
          },
          {
            path: "warehouse",
            element: <Warehouse />,
          },
          {
            path: "order",
            element: <Order />,
          },
        ],
      },
    ],
  },
]);

export default router