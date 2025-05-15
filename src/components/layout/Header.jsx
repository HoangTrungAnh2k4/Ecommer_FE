import { IoSearch, IoCart } from 'react-icons/io5';

import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Space } from 'antd';

import logo from '../../assets/images/general/logo.png';
import Cart from '../ui/Cart';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { useUser } from '../hooks/UserContext';
import { use } from 'react';

const avatr = 'https://www.rophim.me/images//avatars/pack1/14.jpg';

function HeaderPage() {
    const navigation = useNavigate();

    const { userInfo } = useUser();

    const handleLogout = () => {
        localStorage.clear('access_token');

        navigation('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigation(`/search-result?search=${e.target.value}`);
        e.target.value = '';
    };

    const items = [
        {
            label: (
                <div className="mb-4 cursor-text pr-4">
                    <p className="mb-1 text-sm">Xin chào</p>
                </div>
            ),
            key: '0',
            disable: true,
        },

        {
            label: (
                <Link to="/manage-account" className="mb-2 flex items-center pr-4">
                    <FaUser className="mr-3 text-sm" />
                    Tài khoản
                </Link>
            ),
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div onClick={handleLogout} className="flex items-center pr-4">
                    <FaSignOutAlt className="mr-3 text-sm" />
                    Thoát
                </div>
            ),
            key: '3',
        },
    ];

    return (
        <div className="relative z-50 flex items-center bg-background px-20 py-2">
            <Link to={'/'}>
                <img src={logo} alt="" className="w-[150px]" />
            </Link>
            <div className="mx-auto flex w-[40%] rounded-md bg-white">
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch(e);
                    }}
                    type="text"
                    placeholder="Search Something..."
                    className="w-full rounded-md border-none bg-white px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-0"
                />
                <button type="button" className="m-1 flex items-center justify-center rounded-md bg-[#f9bb01] px-5">
                    <IoSearch className="text-2xl text-white" />
                </button>
            </div>

            <div className="flex items-center gap-6">
                <div className="group relative before:absolute before:-right-5 before:top-0 before:h-[130%] before:w-[100px] before:content-['']">
                    <IoCart className="my-auto cursor-pointer rounded-full p-1 text-[2.5rem] hover:bg-white" />
                    {userInfo && <Cart />}
                </div>

                {!userInfo && (
                    <Link
                        to={'/login'}
                        className="flex cursor-pointer items-start justify-center gap-2 rounded-full bg-white px-3.5 py-2 text-black"
                    >
                        <FaUser />
                        <p className="text-sm font-semibold">Thành viên</p>
                    </Link>
                )}

                {userInfo && (
                    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                        <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                            <Space>
                                <img
                                    src={avatr}
                                    alt=""
                                    className="size-11 rounded-full border object-cover object-center"
                                />
                            </Space>
                        </a>
                    </Dropdown>
                )}
            </div>
        </div>
    );
}

export default HeaderPage;
