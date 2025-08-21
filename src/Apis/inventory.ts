import axios from "axios";
import type {
  BarResponse,
  LineResponse,
  PieResponse,
  StatsResponse,
} from "@/types/Api";
import { ENV } from ".";

const base = `${ENV.BaseURl}/inventory`;

export const DashboardAPI = () => {
  const url = `${base}/dashboard?id=${ENV.AdminId}`;
  return axios.get<StatsResponse>(url);
};
export const PieAPI = () => {
  const url = `${base}/pie?id=${ENV.AdminId}`;
  return axios.get<PieResponse>(url);
};
export const LineAPI = () => {
  const url = `${base}/line?id=${ENV.AdminId}`;
  return axios.get<LineResponse>(url);
};
export const BarAPI = () => {
  const url = `${base}/bar?id=${ENV.AdminId}`;
  return axios.get<BarResponse>(url);
};
