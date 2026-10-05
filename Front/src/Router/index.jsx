import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { AboutUs, Contact, Detail_Product, Home, Products } from "../Pages";


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
            }

        ]
    }
])


export default router