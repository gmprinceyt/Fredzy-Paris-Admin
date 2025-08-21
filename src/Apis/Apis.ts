import { DashboardAPI } from "./dashboard";
import { allOrdersApi, ChangeOrderStatusApi, DeleteOrderApi, OrderDetailsApi } from "./orders";
import {
  categoriesApi,
  CreateProductApi,
  deleteProductApi,
  ProductAPI,
  SearchProductAPI,
  SingalProductApi,
  updateProductApi,
} from "./products";
import { GetAllUserApi, GetSingleUserApi } from "./user";

// Import Files
export const ApiFunctions = {
  Dashboard: DashboardAPI,
  Product: ProductAPI,
  SearchProduct: SearchProductAPI,
  Categories: categoriesApi,
  UpdateProduct: updateProductApi,
  CreateProduct: CreateProductApi,
  SingalProduct: SingalProductApi,
  DeleteProduct:deleteProductApi,
  AllOrders: allOrdersApi,
  OrderDetails: OrderDetailsApi,
  GetSingleUser: GetSingleUserApi,
  GetAllUsers:GetAllUserApi,
  DeleteOrder:DeleteOrderApi,
  ChangeOrderStatus:ChangeOrderStatusApi
};
