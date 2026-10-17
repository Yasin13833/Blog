import React from "react";
import CatalogEntityList from "../../../Components/Admin/CatalogEntityList";
export default function GetAll_Pr_Cat(){return <CatalogEntityList title="دسته‌بندی محصولات" singular="دسته‌بندی" endpoint="/admin/product-categories" imageKeys={["image","icon"]} createLabel="افزودن دسته‌بندی"/>;}
