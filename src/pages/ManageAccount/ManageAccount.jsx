import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { BsMenuUp } from 'react-icons/bs';

import RoleAdmin from './RoleAdmin';
import RoleUSer from './RoleUser';
import { useUser } from '../../components/hooks/UserContext';

function ManageAccount() {
    const [activeTab, setActiveTab] = useState('account');

    const tabs = [
        { id: 'account', label: 'Tài khoản', icon: <FaUser className="text-xl" /> },
        { id: 'history', label: 'Lịch sử', icon: <BsMenuUp className="text-xl" /> },
    ];

    const { userInfo } = useUser();

    return (
        <div className="flex gap-20 container">
            <div className="bg-white shadow px-8 pt-4 rounded-xl w-[300px] h-fit min-h-[300px]">
                <h3 className="font-semibold text-lg">Quản lý tài khoản</h3>
                <ul className="mt-6">
                    {tabs.map((tab) => (
                        <li
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`mt-4 flex cursor-pointer items-center gap-3 rounded px-2 py-1 transition ${activeTab === tab.id ? 'text-yellow-700' : 'text-gray-700 hover:bg-gray-300'}`}
                        >
                            {tab.icon}
                            <p>{tab.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {activeTab === 'account' && (
                <div className="container">
                    <h3 className="font-semibold text-lg">Tài khoản</h3>

                    <div className="flex items-center gap-12">
                        <div className="flex flex-col">
                            <label className="mt-6 mb-2 text-textColor2 text-sm">Số điện thoại</label>
                            <input
                                type="text"
                                readOnly
                                placeholder={userInfo?.phoneNumber}
                                className="px-4 py-2 border rounded-lg outline-none h-fit text-sm"
                            />

                            <label className="mt-6 mb-2 text-textColor2 text-sm">Họ tên</label>
                            <input
                                type="text"
                                readOnly
                                placeholder={userInfo?.username}
                                className="px-4 py-2 border rounded-lg outline-none h-fit text-sm"
                            />
                        </div>
                        <div className="mt-8">
                            <img
                                src="https://www.rophim.me/images//avatars/pack1/14.jpg"
                                alt=""
                                className="border-2 border-gray-300 rounded-full size-[115px]"
                            />
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'history' && (userInfo?.role === 'admin' ? <RoleAdmin /> : <RoleUSer />)}
        </div>
    );
}

export default ManageAccount;
