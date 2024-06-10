import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Cart from "./components/client/cart/Cart";
import Landing from "./components/dashboard/landing/Landing";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Client from "./components/client/Client";
import Seller from "./components/seller/Seller";
import MyPurchases from "./components/client/MyPurchases";
import ProductForSale from "./components/seller/productsForSale/ProducstForSale";
import SaleHistory from "./components/seller/saleHistory/SaleHistory";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/client",
      element: <Client />,
    },
    {
      path: "/mypurchases",
      element: <MyPurchases />,
    },
    {
      path: "*",
      element: <Landing />,
    },
    {
      path: "/seller",
      element: <Seller />,
    },
    {
      path: "/productsForSale",
      element: <ProductForSale />,
    },
    {
      path: "/saleHistory",
      element: <SaleHistory />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
