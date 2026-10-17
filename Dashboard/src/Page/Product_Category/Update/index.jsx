import React from "react";
import { useParams } from "react-router-dom";
import CategoryForm from "../../../Components/Admin/CategoryForm";
export default function Update_Pr_Cat(){ const {id}=useParams(); return <CategoryForm id={id} />; }
