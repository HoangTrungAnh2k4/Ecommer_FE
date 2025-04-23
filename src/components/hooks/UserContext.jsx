// src/contexts/UserContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInforAPI } from '../../api/userAPI';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return; // Don't fetch if no token exists

            try {
                const res = await getUserInforAPI();
                setUserInfo(res.data.userInfor);
            } catch (err) {
                console.error('Lỗi khi lấy user info:', err);
            }
        };

        fetchUser();
    }, []);

    return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
