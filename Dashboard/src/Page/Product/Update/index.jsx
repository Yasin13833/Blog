import React from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../../Components/Admin/ProductForm";
export default function Update_Product(){ const {id}=useParams(); return <ProductForm id={id}/>; }
