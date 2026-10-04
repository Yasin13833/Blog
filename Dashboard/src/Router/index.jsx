import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../Layout";
import Auth, { Login} from "../auth";
import { Blog, Category, Home } from "../Page";
import { Create_Product, GetAll_Product, Update_Product } from '../Page/Product'
import { Create_Pr_Cat, GetAll_Pr_Cat, Update_Pr_Cat } from '../Page/Product_Category'
import { Create_Brands, GetAll_Brands, Update_Brands } from "../Page/Brands";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'product',
                children: [
                    {
                        index: true,
                        element: <GetAll_Product />
                    },
                    {
                        path: 'update',
                        element: <Update_Product />
                    },
                    {
                        path: 'create',
                        element: <Create_Product />
                    }

                ]
            },
            {
                path: 'blog',
                element: <Blog />
            },
            {
                path: 'category',
                element: <Category />
            },
            {
                path: 'product-category',
                children: [
                    {
                        index: true,
                        element: <GetAll_Pr_Cat />,
                    },
                    {
                        path: 'update/:id',
                        element: <Update_Pr_Cat />
                    },
                    {
                        path: 'create',
                        element: <Create_Pr_Cat />
                    }
                ]

            },
            {
                path: 'brands',
                children: [
                    {
                        index: true,
                        element: <GetAll_Brands />
                    },
                    {
                        path: 'update',
                        element: <Update_Brands />
                    },
                    {
                        path: 'create',
                        element: <Create_Brands />
                    }
                ]
            }
        ]
    },
    {
        path: '/auth',
        element: <Auth />,
        children: [{ index: true, element: <Login /> }]
    },

])

export default router