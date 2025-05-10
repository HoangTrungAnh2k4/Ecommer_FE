import { useContext, useEffect, useState } from 'react';
import { deleteItemCartAPI, getCartAPI, getEquipmentDetailAPI } from '../../api/userAPI';

import { FaTrash } from 'react-icons/fa6';
import { ListItemBuyContext } from '../hooks/listItemBuyContext';
import { useNavigate } from 'react-router-dom';
import { list } from 'postcss';
import { toast } from 'react-toastify';

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
        <div className="hidden group-hover:block right-0 absolute bg-white shadow mt-2 p-3 border rounded-lg w-[400px] animate-fade-up animate-duration-500">
            <ul className="pr-2 h-[300px] overflow-y-auto">
                {finalCart.length !== 0 ? (
                    finalCart.map((item, index) => {
                        return (
                            <li key={index} className="flex gap-4 py-2 border-gray-300 border-b">
                                <img
                                    src={item.urlImage}
                                    alt=""
                                    className="rounded-lg size-[70px] object-center object-cover"
                                />
                                <div className="w-full">
                                    <div className="flex items-center">
                                        <p className="font-semibold text-textColor1 text-sm line-clamp-2">
                                            {item.name}
                                        </p>
                                        <button
                                            onClick={() => {
                                                handleDeleteItem(item.id);
                                            }}
                                            className="block hover:bg-gray-600 ml-auto p-2 rounded-full hover:text-white"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center mt-3">
                                        <p className="font-semibold text-black text-sm">x {item.quantity}</p>
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
                        className="mx-auto w-[200px] h-[170px] object-center object-cover"
                    />
                )}
            </ul>

            <div className="pt-4 pb-2 border-gray-300 border-t">
                <div className="flex justify-center items-center gap-2">
                    <p className="text-sm">Tổng tiền hàng</p>
                    <p className="text-redColor text-sm">({finalCart?.length} sản phẩm)</p>
                    <p className="font-semibold text-redColor">{totalPrice.toLocaleString('vi-VN')}</p>
                </div>

                <a
                    onClick={() => {
                        navigate('/checkout');
                        sessionStorage.setItem('listCheckout', JSON.stringify(finalCart));
                    }}
                    className="block bg-primary hover:bg-gradient-to-tr from-primary to-second mx-4 mt-6 px-5 py-2.5 rounded-lg text-white text-center cursor-pointer"
                >
                    Thanh toán
                </a>
            </div>
        </div>
    );
}

export default Cart;
