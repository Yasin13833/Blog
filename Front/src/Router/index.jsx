import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { Contact, Home, Products } from "../Pages";


const router = createBrowserRouter([
    {
        path : '/',
        element : <Layout/>,
        children : [
            {
               index : true,
               element : <Home/>
            },
            {
                path : '/contact',
                element : <Contact/>
            },
            {
                path : '/product',
                element : <Products/>
            }
          
        ]
    }
])


export default router