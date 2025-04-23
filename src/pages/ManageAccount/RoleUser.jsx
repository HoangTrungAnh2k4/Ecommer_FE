import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { BsMenuUp } from 'react-icons/bs';
import pc from '../../../public/pc2.jpg';
import { getEquipmentDetailAPI, getOrderAPI } from '../../api/userAPI';

const avatr = 'https://nguyencongpc.vn/media/product/250-25318-custom.jpg';

function RoleUSer() {
    const [orders, setOrders] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes} ${day}/${month}/${year} `;
    };

    const getTotalPrice = (items) => {
        return items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Lấy danh sách order
                const orderData = await getOrderAPI();

                // 2. Lấy các equipment_id duy nhất
                const uniqueIds = [...new Set(orderData.data.map((o) => o.equipment_id))];

                // 3. Gọi getDetailEquipment cho từng equipment_id
                const equipmentMap = {};
                await Promise.all(
                    uniqueIds.map(async (id) => {
                        const detail = await getEquipmentDetailAPI(id);
                        equipmentMap[id] = detail.data;
                    }),
                );

                // 4. Gộp dữ liệu lại theo order_id
                const grouped = orderData.data.reduce((acc, item) => {
                    const detail = equipmentMap[item.equipment_id];
                    const itemWithDetail = {
                        ...detail,
                        quantity: item.quantity,
                    };

                    const existing = acc.find((o) => o.order_id === item.order_id);
                    if (existing) {
                        existing.items.push(itemWithDetail);
                    } else {
                        acc.push({
                            order_id: item.order_id,
                            date: item.date,
                            items: [itemWithDetail],
                        });
                    }

                    return acc;
                }, []);

                setOrders(grouped);
            } catch (err) {
                console.error('Lỗi khi lấy đơn hàng hoặc thiết bị:', err);
            }
        };

        fetchData();
    }, []);

    if (orders.length === 0) {
        return (
            <div className="flex h-fit justify-center rounded-lg border bg-white px-6 py-3">
                <p className="text-xl font-semibold">Chưa có đơn hàng nào</p>
            </div>
        );
    }

    return (
        <div className="flex gap-20">
            <ul className="w-full">
                {orders.length != 0 &&
                    orders?.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className="mb-6 justify-between rounded-lg border bg-white px-8 py-4 shadow"
                            >
                                <div className="flex justify-between text-textColor2">
                                    <p className="border-b-2 border-gray-100 pb-1">#{item.order_id}</p>
                                    <p className="text-sm">{formatDate(item.date)}</p>
                                </div>
                                {item.items.length != 0 &&
                                    item.items?.map((item2, index) => {
                                        return (
                                            <div key={index} className="justify-between border-b-2 border-gray-200 py-6">
                                                <div className="flex gap-4">
                                                    <img
                                                        src={avatr}
                                                        alt=""
                                                        className="size-[120px] object-cover object-center"
                                                    />
                                                    <div className="w-full">
                                                        <p className="font-semibold text-textColor2">{item2.name}</p>
                                                        <div className="mt-6 flex justify-between">
                                                            <p className="text-sm text-textColor2">x{item2.quantity}</p>
                                                            <p className="font-semibold text-redColor">
                                                                {item2.price?.toLocaleString('vi-VN')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                <div className="mt-4 flex items-center justify-end gap-4">
                                    <p className="text-sm text-textColor2">Thành tiền:</p>
                                    <p className="font-semibold text-redColor">
                                        {getTotalPrice(item.items)?.toLocaleString('vi-VN')}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default RoleUSer;
