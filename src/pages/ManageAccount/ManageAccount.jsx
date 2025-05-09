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
        <div className="container flex gap-20">
            <div className="h-fit min-h-[300px] w-[300px] rounded-xl bg-white px-8 pt-4 shadow">
                <h3 className="text-lg font-semibold">Quản lý tài khoản</h3>
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
                    <h3 className="text-lg font-semibold">Tài khoản</h3>

                    <div className="flex items-center gap-12">
                        <div className="flex flex-col">
                            <label className="mb-2 mt-6 text-sm text-textColor2">Số điện thoại</label>
                            <input
                                type="text"
                                readOnly
                                placeholder={userInfo?.phoneNumber}
                                className="h-fit rounded-lg border px-4 py-2 text-sm outline-none"
                            />

                            <label className="mb-2 mt-6 text-sm text-textColor2">Họ tên</label>
                            <input
                                type="text"
                                readOnly
                                placeholder={userInfo?.username}
                                className="h-fit rounded-lg border px-4 py-2 text-sm outline-none"
                            />
                        </div>
                        <div className="mt-8">
                            <img
                                src="https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/18/457/avatar-mac-dinh-12.jpg"
                                alt=""
                                className="size-[115px] rounded-full border-2 border-gray-300"
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
