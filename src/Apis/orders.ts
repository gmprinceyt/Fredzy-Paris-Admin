import axios from "axios"
import { ENV } from ".";
import type { AllOrderResponse, OrderDetailsResponse } from "@/types/Api";

const base = `${ENV.BaseURl}/order`;

export const allOrdersApi = ()=> {
    const url = `${base}/all/?id=${ENV.AdminId}`
    return  axios.get<AllOrderResponse>(url)
} 

export const OrderDetailsApi = (orderId: string)=> {
    const url = `${base}/${orderId}/?id=${ENV.AdminId}`
    return  axios.get<OrderDetailsResponse>(url)
}  
export const DeleteOrderApi = (orderId: string)=> {
    const url = `${base}/${orderId}/?id=${ENV.AdminId}`
    return  axios.delete(url)
}

export const ChangeOrderStatusApi = (orderId: string)=> {
    const url = `${base}/${orderId}/?id=${ENV.AdminId}`
    return  axios.put(url)
}