import instance from '../config/axios';

const CLIENT_URL = import.meta.env.VITE_CLIENT_API_URL || 'http://localhost:3000';

// -------------------------------------------------
//               api about equipment
// -------------------------------------------------

export const getListBestSellerAPI = async (type) => {
    return instance.get(`${CLIENT_URL}/list-best-seller`, {
        params: { type },
    });
};

export const getListEquipmentByTypeAPI = async (type) => {
    return instance.get(`${CLIENT_URL}/list-equipment/by-type`, {
        params: { type },
    });
};

export const getEquipmentDetailAPI = async (id) => {
    return instance.get(`${CLIENT_URL}/equipment-detail/${id}`);
};

export const updateEquipmentAPI = async (data) => {
    const URL_API = `${CLIENT_URL}/update-equipment`;

    return instance.put(URL_API, data);
};

// -------------------------------------------------
//               User api infor
// -------------------------------------------------

export const getUserInforAPI = async () => {
    return instance.get(`${CLIENT_URL}/user-infor`);
};

// -------------------------------------------------
//               api about rate
// -------------------------------------------------

export const postRateAPI = async (data) => {
    return instance.post(`${CLIENT_URL}/post-rate`, data);
};

export const getRateAPI = async (id) => {
    return instance.get(`${CLIENT_URL}/get-rate/${id}`);
};

// -------------------------------------------------
//              api about cart
// -------------------------------------------------

export const getCartAPI = async () => {
    return instance.get(`${CLIENT_URL}/get-cart`);
};

export const addToCartAPI = async (data) => {
    return instance.post(`${CLIENT_URL}/add-to-cart`, data);
};

export const deleteItemCartAPI = async (id) => {
    return instance.delete(`${CLIENT_URL}/delete-item-cart/${id}`);
};

// -------------------------------------------------
//              api about order
// -------------------------------------------------

export const addNewOrderAPI = async (data) => {
    return instance.post(`${CLIENT_URL}/add-new-order`, data);
};

export const getOrderAPI = async () => {
    return instance.get(`${CLIENT_URL}/get-order`);
};

// -------------------------------------------------
//              api about search
// -------------------------------------------------

export const searchAPI = async (search, page, limit) => {
    return instance.get(`${CLIENT_URL}/search`, {
        params: { search, page, limit },
    });
};
