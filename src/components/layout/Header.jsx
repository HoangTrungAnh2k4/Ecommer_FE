import { IoSearch, IoCart } from 'react-icons/io5';

import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Space } from 'antd';

import logo from '../../assets/images/general/logo.png';
import Cart from '../ui/Cart';

function HeaderPage() {
    const avatr = 'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/18/457/avatar-mac-dinh-12.jpg';
    const navigation = useNavigate();

    const handleLogout = () => {
        localStorage.clear('access_token');

        navigation('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigation(`/search-result?search=${e.target.value}`);
    };

    const items = [
        {
            label: (
                <Link to={'/manage-account'} className="">
                    Your profile
                </Link>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={handleLogout}>Đăng xuất</div>,
            key: '1',
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
                <div className="group relative before:absolute before:inset-x-0 before:top-0 before:h-[130%] before:content-['']">
                    <IoCart className="my-auto cursor-pointer rounded-full p-1 text-[2.5rem] hover:bg-white" />
                    <Cart />
                </div>

                <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                        <Space>
                            <img src={avatr} alt="" className="size-11 rounded-full object-cover object-center" />
                        </Space>
                    </a>
                </Dropdown>
                <Link to={'/login'}></Link>
            </div>
        </div>
    );
}

export default HeaderPage;
