import axios from "axios";
import { ENV } from "."
import type { GetSingleUser } from "@/types/Api";

const base = `${ENV.BaseURl}/user`

export const GetSingleUserApi = (userId:string) => {
    const url = `${base}/${userId}/?id=${ENV.AdminId}`;
    return axios.get<GetSingleUser>(url);
}
export const GetAllUserApi = () => {
    const url = `${base}/all/?id=${ENV.AdminId}`;
    return axios.get(url);
}