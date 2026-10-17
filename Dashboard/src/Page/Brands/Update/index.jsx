import React from "react";
import { useParams } from "react-router-dom";
import BrandForm from "../../../Components/Admin/BrandForm";
export default function Update_Brands(){ const {id}=useParams(); return <BrandForm id={id} />; }
