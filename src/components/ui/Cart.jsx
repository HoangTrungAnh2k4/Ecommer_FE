import { useContext, useEffect, useState } from 'react';
import { deleteItemCartAPI, getCartAPI, getEquipmentDetailAPI } from '../../api/userAPI';

import { FaTrash } from 'react-icons/fa6';
import { ListItemBuyContext } from '../hooks/listItemBuyContext';
import { useNavigate } from 'react-router-dom';
import { list } from 'postcss';
import { toast } from 'react-toastify';

const avatr = 'https://nguyencongpc.vn/media/product/250-27134-gigabyte-z890-aorus-master-1.jpg';

function Cart() {
    const [idItemCart, setIdItemCart] = useState([]);
    const [inforItemCart, setInforItemCart] = useState([]);
    const [finalCart, setFinalCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const { setListItem } = useContext(ListItemBuyContext);

    const navigate = useNavigate();

    const handleDeleteItem = async (id) => {
        try {
            const response = await deleteItemCartAPI(id);
            if (response) {
                getIdItemCart();
                toast.success('Xóa sản phẩm thành công');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getIdItemCart = async () => {
        try {
            const response = await getCartAPI();

            if (response.data.length === 0) {
                setFinalCart([]);
            }

            if (response.data) {
                setIdItemCart(response.data);
            }
        } catch (error) {
            if (error.response.status === 404) {
                setFinalCart([]);
            }
        }
    };

    useEffect(() => {
        getIdItemCart();
    }, []);

    useEffect(() => {
        const total = finalCart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        setTotalPrice(total);
    }, [finalCart]);

    useEffect(() => {
        const getInforItemCart = async () => {
            if (idItemCart.length === 0) return;

            try {
                const promise = idItemCart.map((item) => {
                    return getEquipmentDetailAPI(item.product_id);
                });

                const response = await Promise.all(promise);

                const data = response.map((item) => {
                    return {
                        id: item.data._id,
                        name: item.data.name,
                        price: item.data.price,
                        urlImage: item.data.urlImage,
                    };
                });

                setInforItemCart(data);
            } catch (error) {
                console.log(error);
            }
        };
        getInforItemCart();
    }, [idItemCart]);

    useEffect(() => {
        const mergeDataCart = () => {
            const mergedData = idItemCart.map((item) => {
                const matchedItem = inforItemCart.find((data) => data.id === item.product_id);
                return {
                    quantity: item.quantity,
                    ...matchedItem,
                };
            });
            setFinalCart(mergedData);
            setListItem(mergedData);
        };

        mergeDataCart();
    }, [inforItemCart]);

    return (
        <div className="absolute right-0 mt-2 hidden w-[400px] animate-fade-up rounded-lg border bg-white p-3 shadow animate-duration-500 group-hover:block">
            <ul className="h-[300px] overflow-y-auto pr-2">
                {finalCart.length !== 0 ? (
                    finalCart.map((item, index) => {
                        return (
                            <li key={index} className="flex gap-4 border-b border-gray-300 py-2">
                                <img
                                    src={item.urlImage}
                                    alt=""
                                    className="size-[70px] rounded-lg object-cover object-center"
                                />
                                <div className="w-full">
                                    <div className="flex items-center">
                                        <p className="line-clamp-2 text-sm font-semibold text-textColor1">
                                            {item.name}
                                        </p>
                                        <button
                                            onClick={() => {
                                                handleDeleteItem(item.id);
                                            }}
                                            className="ml-auto block rounded-full p-2 hover:bg-gray-600 hover:text-white"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <p className="text-sm font-semibold text-black">x {item.quantity}</p>
                                        <p className="font-semibold text-redColor">
                                            {item.price.toLocaleString('vi-VN')}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <img
                        src="https://www.shutterstock.com/image-vector/no-item-found-vector-outline-260nw-2082716986.jpg"
                        alt=""
                        className="mx-auto h-[170px] w-[200px] object-cover object-center"
                    />
                )}
            </ul>

            <div className="border-t border-gray-300 pb-2 pt-4">
                <div className="flex items-center justify-center gap-2">
                    <p className="text-sm">Tổng tiền hàng</p>
                    <p className="text-sm text-redColor">({finalCart?.length} sản phẩm)</p>
                    <p className="font-semibold text-redColor">{totalPrice.toLocaleString('vi-VN')}</p>
                </div>

                <a
                    onClick={() => {
                        navigate('/checkout');
                        sessionStorage.setItem('listCheckout', JSON.stringify(finalCart));
                    }}
                    className="mx-4 mt-6 block cursor-pointer rounded-lg bg-primary from-primary to-second px-5 py-2.5 text-center text-white hover:bg-gradient-to-tr"
                >
                    Thanh toán
                </a>
            </div>
        </div>
    );
}

export default Cart;
