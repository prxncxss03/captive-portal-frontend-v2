import axios from "axios";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
     
        }

    }
);
