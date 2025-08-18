import axios from 'axios';
import { baseURL } from '.';
import type { StatsResponse } from '@/types/Api';

export const DashboardAPI = ()=> {
    const url =  `${baseURL}/inventory/dashboard?id=13533265`
    return axios.get<StatsResponse>(url)
}   