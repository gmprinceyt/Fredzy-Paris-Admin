import axios from "axios";
import { ENV } from ".";
import type { CategoriesResponse, ProductResponse, SearchProductQeury, SearchProductResponse, UpdateProductQuery } from "@/types/Api";

const base = `${ENV.BaseURl}/product`;

export const ProductAPI = () => {
  const url = `${base}/admin-product/?id=${ENV.AdminId}`;
  return axios.get<ProductResponse>(url);
};

export const SearchProductAPI = ({
  category,
  page,
  price,
  search,
  sort,
}: SearchProductQeury) => {
  if (category === 'all'){
    category = "";
  }
  const url = `${base}/search/?search=${search}&sort=${sort}&category=${category}&price=${price}&page=${page}`;
  return axios.get<SearchProductResponse>(url);
};


export const categoriesApi = ()=> {
  const url = `${base}/categories`;
  return axios.get<CategoriesResponse>(url);
};


export const updateProductApi = (productId:string)=> {
  const url = `${base}/${productId}/?id=${ENV.AdminId}`;
  return axios.patch<UpdateProductQuery>(url);
}