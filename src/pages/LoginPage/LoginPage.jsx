import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { authLoginAPI } from '../../api/authAPI';
import { useUser } from '../../components/hooks/UserContext';
import { useState } from 'react';

function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserInfo } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);

        const userNumber = formData.get('username');
        const password = formData.get('password');

        try {
            const res = await authLoginAPI(userNumber, password);

            if (res) {
                localStorage.setItem('access_token', res.data.access_token);
                setUserInfo(res.data.user);

                navigate('/');
            }
        } catch (error) {
            console.log(error);

            if (error.response?.status === 401) {
                toast.error('Sai tài khoản hoặc mật khẩu');
            } else toast.error('Lỗi hệ thống');
        }
    };

    if (isLoading) {
        return (
            <div className="z-50 fixed inset-0 flex justify-center items-center bg-background">
                <div className="border-4 border-primary border-t-transparent rounded-full w-16 h-16 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen login__page">
            <div className="bg-white shadow px-10 py-6 rounded-xl w-[500px]">
                <h3 className="font-semibold text-xl text-center">Đăng nhập </h3>

                {/* form input */}
                <form onSubmit={handleLogin} className="mt-8">
                    <div className="group z-0 relative mb-6 w-full">
                        <input
                            type="text"
                            name="username"
                            id="userNumber"
                            className="peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 border-b outline-none w-full text-gray-900 appearance-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="username"
                            className="top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:text-gray-600 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0"
                        >
                            Số điện thoại
                        </label>
                    </div>
                    <div className="group z-0 relative w-full">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 border-b outline-none w-full text-gray-900 appearance-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="password"
                            className="top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:text-gray-600 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0"
                        >
                            Mật khẩu
                        </label>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember" className="text-textColor2 text-sm">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                        <Link to="" className="text-textColor2 text-sm hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="bg-primary mt-10 py-3 rounded-md w-full font-semibold text-white text-lg"
                    >
                        Đăng nhập
                    </button>
                </form>

                <div className="flex justify-center items-center mt-8">
                    <p className="text-textColor2">Bạn chưa có tài khoản?</p>
                    <Link to="/register" className="ml-2 font-semibold text-primary hover:underline">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
