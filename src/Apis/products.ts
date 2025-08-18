import axios from 'axios';
import { AdminId, baseURL } from '.';
import type { StatsResponse } from '@/types/Api';


export const ProductAPI = ()=> {
    const url =  `${baseURL}/product/admin-product/?id=${AdminId}`
    return axios.get<StatsResponse>(url)
}