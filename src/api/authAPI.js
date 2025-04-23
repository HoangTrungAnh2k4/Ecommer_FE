import instance from '../config/axios';

const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;

export const authLoginAPI = async (phoneNumber, password) => {
    const URL_API = `${AUTH_URL}/login`;

    const data = {
        phoneNumber,
        password,
    };

    return instance.post(URL_API, data);
};

export const authRegisterAPI = async (data) => {
    const URL_API = `${AUTH_URL}/register`;

    return instance.post(URL_API, data);
};

export const loginGoogleAPI = async (credential) => {
    const URL_API = `${AUTH_URL}/login-google`;

    const data = {
        credential,
    };

    return instance.post(URL_API, data);
};
