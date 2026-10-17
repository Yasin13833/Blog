import React from "react";
import CatalogEntityList from "../../../Components/Admin/CatalogEntityList";
export default function GetAll_Brands(){return <CatalogEntityList title="برندها" singular="برند" endpoint="/admin/brands" imageKeys={["logo","coverImage"]} createLabel="افزودن برند"/>;}
