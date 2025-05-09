import { FaPlus, FaMinus } from 'react-icons/fa6';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { addNewOrderAPI, updateEquipmentAPI } from '../../api/userAPI';
import { toast } from 'react-toastify';

function CheckoutPage() {
    const [listCheckout, setListCheckout] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [Checkouted, setCheckouted] = useState(false);

    const handleDeleteItem = (id) => {
        const updatedList = listCheckout.filter((item) => item.id !== id);
        setListCheckout(updatedList);
        sessionStorage.setItem('listCheckout', JSON.stringify(updatedList));
    };

    const handleChangeQuantity = (id, type) => {
        const updatedList = listCheckout.map((item) => {
            if (item.id === id) {
                const quantity = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
                if (quantity < 1) return item; // Prevent quantity from going below 1

                return { ...item, quantity };
            }
            return item;
        });
        setListCheckout(updatedList);
        sessionStorage.setItem('listCheckout', JSON.stringify(updatedList));
    };

    const handleCheckouted = async () => {
        if (listCheckout.length === 0) {
            toast.error('Không có sản phẩm nào trong giỏ hàng');
            return;
        }

        try {
            const data = {
                listEquipment: listCheckout.map((item) => {
                    return {
                        equipmentId: item.id || item._id,
                        quantity: item.quantity,
                    };
                }),
            };

            const res = await addNewOrderAPI(data);
            if (res.status === 200) {
                setCheckouted(true);
                setListCheckout([]);
                sessionStorage.setItem('listCheckout', JSON.stringify([]));
                toast.success('Đặt hàng thành công');
            } else {
                toast.error('Đặt hàng thất bại');
            }

            updateEquipmentAPI(data); // Cập nhật số lượng sản phẩm đã bán
        } catch (error) {
            console.log(error);
            toast.error('Đặt hàng thất bại');
        }
    };

    useEffect(() => {
        const fromStorage = sessionStorage.getItem('listCheckout');

        if (fromStorage) {
            const parsed = JSON.parse(fromStorage);
            setListCheckout(parsed);
        }
    }, []);

    useEffect(() => {
        const total = listCheckout.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        setTotalPrice(total);
    }, [listCheckout]);

    if (!listCheckout || Array.isArray(listCheckout) === false) {
        return <div>Loading...</div>;
    }

    if (Checkouted) {
        return (
            <div className="flex flex-col justify-center items-center gap-4 mx-auto w-full">
                <div className="mt-[5%] text-[160px] text-green-600">
                    <IoMdCheckmarkCircleOutline />
                </div>

                <h3 className="font-semibold text-orange-600 text-2xl">Đặt hàng thành công</h3>
                <p className="text-lg">Chúng tôi sẽ liên hệ quý khách để xác nhận đơn hàng trong thời gian sớm nhất</p>
            </div>
        );
    }

    return (
        <div className="flex gap-12 mx-auto">
            <div className="shadow-lg px-6 py-4 border rounded-lg w-4/6">
                <button
                    onClick={() => {
                        setListCheckout([]);
                        sessionStorage.setItem('listCheckout', JSON.stringify([]));
                    }}
                    className="block ml-auto px-2 py-1 border text-sm"
                >
                    Xóa giỏ hàng
                </button>
                <ul className="mt-4 max-h-[500px] overflow-auto">
                    {listCheckout.length != 0 &&
                        listCheckout?.map((item, index) => {
                            return (
                                <li key={index} className="flex justify-between gap-6 py-6 border-gray-300 border-b-2">
                                    <img
                                        src={item.urlImage}
                                        alt=""
                                        className="size-[120px] object-center object-cover"
                                    />
                                    <p className="font-semibold text-textColor2">{item.name}</p>
                                    <div className="flex max-w-[8rem]">
                                        <button
                                            onClick={() => {
                                                handleChangeQuantity(item.id, 'minus');
                                            }}
                                            className="bg-gray-50 p-3 border border-gray-300 rounded-s-lg h-11"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="flex justify-center items-center bg-gray-50 py-2.5 border border-gray-300 border-x-0 outline-none w-20 h-11 text-gray-900 text-sm text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => {
                                                handleChangeQuantity(item.id, 'plus');
                                            }}
                                            className="bg-gray-50 p-3 border border-gray-300 rounded-e-lg h-11"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <div className="flex flex-col justify-between items-end">
                                        <p className="font-semibold text-redColor">
                                            {item.price?.toLocaleString('vi-VN')}
                                        </p>
                                        <RiDeleteBin6Line
                                            onClick={() => {
                                                handleDeleteItem(item.id);
                                            }}
                                            className="bg-gray-200 p-[6px] rounded-full text-3xl hover:scale-110 cursor-pointer"
                                        />
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>

            <div className="top-0 sticky shadow-lg px-8 pt-4 border rounded-lg h-fit">
                <h3 className="font-semibold text-textColor1 text-xl">Thông tin đơn hàng</h3>

                <div className="mt-6">
                    <p className="font-semibold">Phương thức thanh toán:</p>
                    <div className="flex items-center gap-2 mt-2">
                        <input id="delivery" type="radio" checked={true} />
                        <label htmlFor="delivery" className="text-sm">
                            Thanh toán khi nhận hàng
                        </label>
                    </div>
                </div>

                <div className="flex justify-between mt-6 pb-4 border-gray-400 border-b-2">
                    <p className="font-semibold">Tổng tiền:</p>
                    <p className="font-semibold text-redColor text-xl">{totalPrice.toLocaleString('vi-VN')}</p>
                </div>

                <ul className="mt-6 text-textColor2 text-sm list-disc">
                    <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                    <li>Bạn có thể nhập mã giảm giá ở trang thanh toán.</li>
                </ul>

                <button
                    onClick={() => {
                        handleCheckouted();
                    }}
                    className="block bg-primary hover:bg-gradient-to-tr from-primary to-second mx-auto mt-10 mb-6 py-2 rounded-lg w-2/5 text-white"
                >
                    ĐẶT HÀNG
                </button>
            </div>
        </div>
    );
}

export default CheckoutPage;
