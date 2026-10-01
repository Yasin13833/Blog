import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../Layout";
import Auth, { Login, Register } from "../auth";
import { Blog, Brands, Category, Home } from "../Page";
import { store } from "../Store";
import { Create_Product, GetAll_Product, Update_Product } from '../Page/Product'
import { Create_Pr_Cat, GetAll_Pr_Cat, Update_Pr_Cat } from '../Page/Product_Category'

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
            }, {
                path: 'product-category',
                children: [
                    {
                        index: true,
                        element: <GetAll_Pr_Cat />,
                    },
                    {
                        path: 'update',
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
                element: <Brands />
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