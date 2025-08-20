import axios from "axios";
import { ENV } from ".";
import type { CategoriesResponse, ProductResponse, SearchProductQeury, SearchProductResponse, SingalProductResponse } from "@/types/Api";

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



export const CreateProductApi = (post:FormData)=> {
  const url = `${base}/create/?id=${ENV.AdminId}`;
  return axios.post(url, post);
};


export const SingalProductApi = (productId:string)=> {
  const url = `${base}/${productId}/?id=${ENV.AdminId}`;
  return axios.get<SingalProductResponse>(url);
}
export const deleteProductApi = (productId:string)=> {
  const url = `${base}/${productId}/?id=${ENV.AdminId}`;
  return axios.delete(url);
}

export const updateProductApi = ({productId,post }:{productId:string, post:FormData})=> {
  const url = `${base}/${productId}/?id=${ENV.AdminId}`;
  return axios.put(url, post);
}

export const categoriesApi = ()=> {
  const url = `${base}/categories`;
  return axios.get<CategoriesResponse>(url);
};
