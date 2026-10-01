import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../Layout";
import Auth, { Login, Register } from "../auth";
import { Blog, Category, Home, Product } from "../Page";
import { store } from "../Store";

const handleToken = () => {
    const token = store.getState()?.auth?.token

    if (!token) return redirect("/auth")
    return null
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: handleToken,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'product',
                element: <Product />
            },
            {
                path: 'blog',
                element: <Blog />
            },
            {
                path: 'category',
                element: <Category />
            }
        ]
    },
    {
        path: '/auth',
        element: <Auth />,
        children: [{ index: true, element: <Login /> }, { path: "register", element: <Register /> }]
    },

])

export default router