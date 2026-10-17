import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Auth, { Login } from "../auth";
import { Home } from "../Page";
import { Create_Product, GetAll_Product, Update_Product } from "../Page/Product";
import { Create_Pr_Cat, GetAll_Pr_Cat, Update_Pr_Cat } from "../Page/Product_Category";
import { Create_Brands, GetAll_Brands, Update_Brands } from "../Page/Brands";
import Account from "../Page/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "account", element: <Account /> },
      {
        path: "product",
        children: [
          { index: true, element: <GetAll_Product /> },
          { path: "create", element: <Create_Product /> },
          { path: "update/:id", element: <Update_Product /> },
        ],
      },
      {
        path: "product-category",
        children: [
          { index: true, element: <GetAll_Pr_Cat /> },
          { path: "create", element: <Create_Pr_Cat /> },
          { path: "update/:id", element: <Update_Pr_Cat /> },
        ],
      },
      {
        path: "brands",
        children: [
          { index: true, element: <GetAll_Brands /> },
          { path: "create", element: <Create_Brands /> },
          { path: "update/:id", element: <Update_Brands /> },
        ],
      },
    ],
  },
  { path: "/auth", element: <Auth />, children: [{ index: true, element: <Login /> }] },
]);

export default router;
