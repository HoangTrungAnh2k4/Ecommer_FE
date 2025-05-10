import { useEffect, useState } from 'react';
import { getOrderAPI } from '../../api/userAPI';

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

    const getTotalPrice = (order) => {
        const items = order.map((item) => ({
            price: item.equipment_id.price,
            quantity: item.quantity,
        }));
        return items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderData = await getOrderAPI();

                setOrders(orderData.data);
            } catch (err) {
                console.error('Lỗi khi lấy đơn hàng hoặc thiết bị:', err);
            }
        };

        fetchData();
    }, []);

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center w-full">
                <div className="border-4 border-yellow-600 border-t-transparent rounded-full w-16 h-16 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex gap-20 w-[60%]">
            <ul className="w-full">
                {orders?.length != 0 &&
                    orders?.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className="justify-between bg-white shadow mb-6 px-8 py-4 border rounded-lg"
                            >
                                <div className="flex justify-between text-textColor2">
                                    <p className="pb-1 border-gray-100 border-b-2">#{item._id}</p>
                                    <p className="text-sm">{formatDate(item.date)}</p>
                                </div>
                                {item.equipmentList != 0 &&
                                    item.equipmentList.map((equipment, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="justify-between py-6 border-gray-200 border-b-2"
                                            >
                                                <div className="flex gap-4">
                                                    <img
                                                        src={equipment.equipment_id.urlImage}
                                                        alt=""
                                                        className="size-[120px] object-center object-cover"
                                                    />
                                                    <div className="w-full">
                                                        <p className="font-semibold text-textColor2">
                                                            {equipment.equipment_id.name}
                                                        </p>
                                                        <div className="flex justify-between mt-6">
                                                            <p className="text-textColor2 text-sm">
                                                                x {equipment.quantity}
                                                            </p>
                                                            <p className="font-semibold text-redColor">
                                                                {equipment.equipment_id.price?.toLocaleString('vi-VN')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div className="flex justify-end items-center gap-4 mt-4">
                                    <p className="text-textColor2 text-sm">Thành tiền:</p>
                                    <p className="font-semibold text-redColor">
                                        {getTotalPrice(item.equipmentList)?.toLocaleString('vi-VN')}
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
