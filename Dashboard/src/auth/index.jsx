import React from 'react'
import Login from "./Login";
import Register from "./Register";
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Auth() {
    
    return (
        <>
          <Outlet />
        </>
    )
}


export {
    Login,
    Register
}