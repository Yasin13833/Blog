import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { AboutUs, Categories, Contact, Detail_Product, Home, Products } from "../Pages";
import Detail_Categories from "../Pages/DetailCategories";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/about',
                element: <AboutUs />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: 'detail-product/:id',
                element: <Detail_Product />
            },
            {
                path : 'categories',
                element : <Categories/>
            },
            {
                path : 'detail-categories/:id',
                element : <Detail_Categories/>
            }

        ]
    }
])


export default router