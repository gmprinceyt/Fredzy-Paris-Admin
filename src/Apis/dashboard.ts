import axios from 'axios';
import type { StatsResponse } from '@/types/Api';
import { ENV } from '.';

export const DashboardAPI = ()=> {
    const url =  `${ENV.BaseURl}/inventory/dashboard?id=${ENV.AdminId}`
    return axios.get<StatsResponse>(url)
}   