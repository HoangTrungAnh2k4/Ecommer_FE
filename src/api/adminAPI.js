import instance from '../config/axios';

const ADMIN_URL = import.meta.env.VITE_ADMIN_API_URL ;

export const addNewProductAPI = async (data) => {
    const URL_API = `${ADMIN_URL}/add-product`;

    return instance.post(URL_API, data);
};

export const deleteProductAPI = async (id) => {
    const URL_API = `${ADMIN_URL}/delete-product/${id}`;

    return instance.delete(URL_API);
};

export const deleteRateAPI = async (id) => {
    const URL_API = `${ADMIN_URL}/delete-rate/${id}`;

    return instance.delete(URL_API);
};

export const getAllOrdersAPI = async () => {
    const URL_API = `${ADMIN_URL}/get-all-orders`;

    return instance.get(URL_API);
};

export const getMonthlyStatsAPI = async () => {
    const URL_API = `${ADMIN_URL}/get-monthly-stats`;

    return instance.get(URL_API);
};


