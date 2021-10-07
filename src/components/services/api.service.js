/*
Author: Angelie Escaran
*/
import { axiosInstance as api } from "./base";
import { getAuthSession } from "@/helpers/auth.helper";

const interceptor = (config) => {
    config.headers['Authorization'] = `Bearer ${getAuthSession().accessToken}`;
    return config;
}
api.interceptors.request.use(interceptor);

//LOGIN
export const loginAPI = (data) => api.post("/account/login", data,);

//PASSPORT
export const addPassportListAPI = (data) => api.post("/passport/add", data);
export const getPassportListAPI = () => api.get("/passport/getlist");
export const updatePassportAPI = (data) => api.put(`/passport/${data.id}`, data);
export const deletePassportAPI = (id) => api.delete(`/passport/${id}`);