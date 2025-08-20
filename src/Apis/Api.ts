import { DashboardAPI } from "./dashboard";
import {
  categoriesApi,
  CreateProductApi,
  ProductAPI,
  SearchProductAPI,
  SingalProductApi,
  updateProductApi,
} from "./products";

// Export File
export const ApiFunctions = {
  Dashboard: DashboardAPI,
  Product: ProductAPI,
  SearchProduct: SearchProductAPI,
  Categories: categoriesApi,
  UpdateProduct: updateProductApi,
  CreateProduct: CreateProductApi,
  SingalProduct: SingalProductApi,
};
