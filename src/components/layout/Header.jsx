import { IoSearch, IoCart } from 'react-icons/io5';

import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Space } from 'antd';

import logo from '../../assets/images/general/logo.png';
import Cart from '../ui/Cart';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';

function HeaderPage() {
    const avatr = 'https://www.rophim.me/images//avatars/pack1/14.jpg';
    const navigation = useNavigate();

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
                <div className="mb-4 pr-4 cursor-text">
                    <p className="mb-1 text-sm">Xin chào</p>
                </div>
            ),
            key: '0',
            disable: true,
        },

        {
            label: (
                <Link to="/manage-account" className="flex items-center mb-2 pr-4">
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
        <div className="z-50 relative flex items-center bg-background px-20 py-2">
            <Link to={'/'}>
                <img src={logo} alt="" className="w-[150px]" />
            </Link>
            <div className="flex bg-white mx-auto rounded-md w-[40%]">
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch(e);
                    }}
                    type="text"
                    placeholder="Search Something..."
                    className="bg-white px-4 py-3 border-none rounded-md focus:outline-none focus:ring-0 w-full text-gray-600 text-sm"
                />
                <button type="button" className="flex justify-center items-center bg-[#f9bb01] m-1 px-5 rounded-md">
                    <IoSearch className="text-white text-2xl" />
                </button>
            </div>

            <div className="flex items-center gap-6">
                <div className="group before:top-0 before:-right-5 before:absolute relative before:w-[100px] before:h-[130%] before:content-['']">
                    <IoCart className="hover:bg-white my-auto p-1 rounded-full text-[2.5rem] cursor-pointer" />
                    <Cart />
                </div>

                <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                        <Space>
                            <img
                                src={avatr}
                                alt=""
                                className="border rounded-full size-11 object-center object-cover"
                            />
                        </Space>
                    </a>
                </Dropdown>
                <Link to={'/login'}></Link>
            </div>
        </div>
    );
}

export default HeaderPage;
