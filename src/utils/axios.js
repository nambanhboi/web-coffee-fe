import axios from "axios";
import { urlApi } from "../config/config";
const instance = axios.create({
    baseURL: urlApi,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const setAuthToken = (token) => {
    if(token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
    }
    else {
        delete instance.defaults.headers.common['Authorization'];
    }
}

export default instance;