import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { Contact, Home } from "../Pages";


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
           
          
        ]
    }
])


export default router