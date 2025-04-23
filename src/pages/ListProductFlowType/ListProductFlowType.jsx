import { useParams } from 'react-router-dom';
import { FaArrowTrendUp, FaArrowTrendDown, FaPlus } from 'react-icons/fa6';

import ItemCard from '../../components/ui/Item.card';
import { useEffect, useState } from 'react';

import { getListEquipmentByTypeAPI, getListBestSellerAPI } from '../../api/userAPI';
import { addNewProductAPI } from './../../api/adminAPI';

import ModalAddProduct from './ModalAddProduct';
import { toast } from 'react-toastify';
import { useUser } from '../../components/hooks/UserContext';

const priceRanges = [
    { label: '1 triệu - 4 triệu', min: 1_000_000, max: 4_000_000 },
    { label: '5 triệu - 9 triệu', min: 5_000_000, max: 9_000_000 },
    { label: '10 triệu - 15 triệu', min: 10_000_000, max: 15_000_000 },
    { label: '16 triệu - 20 triệu', min: 16_000_000, max: 20_000_000 },
    { label: 'trên 21 triệu ', min: 21_000_000, max: Infinity },
];

function ListProductFlowType() {
    const { id } = useParams();

    const [listProduct, setListProduct] = useState([]);
    const [filerListProduct, setFilerListProduct] = useState([]);
    const [listBestSeller, setListBestSeller] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [priceRange, setPriceRange] = useState(null);
    const [sortBy, setSortBy] = useState('');

    const { userInfo } = useUser();

    const equipmentType = {
        cpu: {
            img: 'https://nguyencongpc.vn/media/banner/14_Sep5c3b90ea6b605723f5bc25046a627e87.webp',
            des: 'CPU - Bộ Vi Xử Lý',
        },
        gpu: {
            img: 'https://nguyencongpc.vn/media/banner/14_Sepd84bf66551a540c7aa404989b210d888.webp',
            des: 'VGA - Card Màn Hình',
        },
        mainboard: {
            img: 'https://nguyencongpc.vn/media/banner/14_Sepb4eb35e60d6f2414bfa23b0cc28a8bce.webp',
            des: 'Mainboard - Bo Mạch Chủ',
        },
        monitor: {
            img: 'https://nguyencongpc.vn/media/banner/05_Febeb00e3c3f19ceda40733b5d4d8f335ed.webp',
            des: 'Màn Hình Máy Tính',
        },
        laptop: {
            img: 'https://nguyencongpc.vn/media/banner/12_Febba979f43d97f5077b1881d70677e9585.webp',
            des: 'Laptop - Phụ Kiện',
        },
        pc: {
            img: 'https://nguyencongpc.vn/media/banner/07_Febc979a257d61b60e2e33a39a767dbc909.webp',
            des: 'PC Build Sẵn',
        },
        ssd: {
            img: 'https://nguyencongpc.vn/media/banner/20_Sepa314bd95e99630cbbee2d9af557c29a2.png',
            des: 'Thiết Bị Lưu Trữ',
        },
    };

    const getListEquipmentByType = async () => {
        try {
            const response = await getListEquipmentByTypeAPI(id);

            setListProduct(response.data);
            setFilerListProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getListBestSeller = async () => {
        try {
            const response = await getListBestSellerAPI(id);
            setListBestSeller(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddProduct = async (data) => {
        try {
            const response = await addNewProductAPI(data);
            if (response.status === 200) {
                setVisible(false);
                getListEquipmentByType();
                // getListBestSeller();
                toast.success('Thêm sản phẩm thành công');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message);
            } else if (error.response?.data?.error) {
                toast.error(error.response?.data?.error);
            }
        }
    };

    const sortByPriceAsc = (arr) => {
        return [...arr].sort((a, b) => a.price - b.price);
    };

    const sortByPriceDesc = (arr) => {
        return [...arr].sort((a, b) => b.price - a.price);
    };

    const handlePriceRangeFilter = (min, max) => {
        setPriceRange({ min, max });
        const filteredProducts = listProduct.filter((product) => product.price >= min && product.price <= max);
        setFilerListProduct(filteredProducts);
    };

    const removeFilter = () => {
        setPriceRange(null);
        setSortBy('');
        setFilerListProduct(listProduct);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getListEquipmentByType();
        getListBestSeller();
    }, [id]);

    return (
        <div className="container">
            <img src={equipmentType[id]?.img} alt={equipmentType[id]?.des} className="w-full rounded-lg" />

            <h1 className="mt-6 text-center text-2xl font-semibold text-[#0f5b99]">{equipmentType[id]?.des}</h1>

            <div className="mt-6 rounded-lg bg-gradient-to-r from-[#8f0000] via-redColor to-[#8f0000] px-6 py-6">
                <h3 className="text-center text-3xl font-semibold text-white">TOP 5 SẢN PHẨM</h3>
                <div className="mt-6 flex gap-6">
                    {loading ? (
                        <div className="flex h-[300px] items-center justify-center rounded-lg border bg-[#f8f8f8] text-[#515151]">
                            Loading...
                        </div>
                    ) : listBestSeller.length === 0 ? (
                        <div className="flex h-[300px] items-center justify-center rounded-lg border bg-[#f8f8f8] text-[#515151]">
                            Không có sản phẩm nào
                        </div>
                    ) : (
                        listBestSeller.map((item, index) => (
                            <ItemCard
                                key={index}
                                item={{
                                    image: item.image_url,
                                    best_seller: item.best_seller,
                                    name: item.name,
                                    price: item.price,
                                    discount: item.discount,
                                    countSold: item.sold_quantity ?? 0,
                                    sold_quantity: item.sold_quantity,
                                    role: userInfo?.role,
                                }}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="mt-6 rounded-lg border bg-white">
                <div className="flex border-b border-gray-300 p-4">
                    <p className="mr-6 w-fit flex-shrink-0 text-sm font-semibold">Khoảng giá:</p>
                    <ul className="flex flex-wrap gap-4">
                        {priceRanges.map((range, index) => {
                            const isSelected = priceRange?.min === range.min && priceRange?.max === range.max;
                            return (
                                <li
                                    key={index}
                                    onClick={() => handlePriceRangeFilter(range.min, range.max)}
                                    className={`cursor-pointer rounded-lg border px-2 py-1 text-sm hover:shadow-inner hover:shadow-gray-400 ${
                                        isSelected ? 'bg-primary text-white' : 'bg-[#f8f8f8]'
                                    }`}
                                >
                                    {range.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex p-4">
                    <p className="mr-6 w-fit flex-shrink-0 text-sm font-semibold">Chọn theo tiêu chí:</p>
                    <ul className="flex flex-wrap gap-4"></ul>
                </div>
            </div>

            <div className="mt-6 rounded-lg border bg-white p-4">
                {/* filter */}
                <div className="inline-flex w-full gap-4">
                    <div
                        onClick={() => {
                            setSortBy('asc');
                            setFilerListProduct(sortByPriceAsc(filerListProduct));
                        }}
                        className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-sm text-[#515151] hover:shadow-inner hover:shadow-gray-400 ${sortBy === 'asc' ? 'bg-primary text-white' : ''}`}
                    >
                        <FaArrowTrendUp />
                        <p>Giá tăng dần</p>
                    </div>
                    <div
                        onClick={() => {
                            setSortBy('desc');
                            setFilerListProduct(sortByPriceDesc(filerListProduct));
                        }}
                        className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-sm text-[#515151] hover:shadow-inner hover:shadow-gray-400 ${sortBy === 'desc' ? 'bg-primary text-white' : ''}`}
                    >
                        <FaArrowTrendDown />
                        <p>Giá giảm dần</p>
                    </div>
                    <div
                        onClick={() => {
                            removeFilter();
                        }}
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-sm text-[#515151] hover:shadow-inner hover:shadow-gray-400"
                    >
                        <p>Bỏ filter</p>
                    </div>

                    {userInfo?.role === 'admin' && (
                        <div
                            onClick={() => {
                                setVisible(true);
                            }}
                            className="btn ml-auto flex w-fit cursor-pointer items-center gap-4 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-[#515151] hover:bg-gray-200"
                        >
                            <p>Thêm sản phẩm</p>
                            <FaPlus className="text-xl" />
                        </div>
                    )}
                </div>

                <div className="mt-6 flex flex-wrap gap-6">
                    {loading ? (
                        <div className="flex h-[300px] items-center justify-center rounded-lg border bg-[#f8f8f8] text-[#515151]">
                            Loading...
                        </div>
                    ) : filerListProduct.length === 0 ? (
                        <div className="flex h-[300px] items-center justify-center rounded-lg border bg-[#f8f8f8] text-[#515151]">
                            Không có sản phẩm nào
                        </div>
                    ) : (
                        filerListProduct.map((item, index) => (
                            <ItemCard
                                key={index}
                                item={{
                                    id: item.id,
                                    image: item.image_url,
                                    best_seller: item.best_seller,
                                    name: item.name,
                                    price: item.price,
                                    discount: item.discount,
                                    countSold: item.sold_quantity ?? 0,
                                    sold_quantity: item.sold_quantity,
                                    role: userInfo?.role,
                                }}
                            />
                        ))
                    )}
                </div>
            </div>

            <ModalAddProduct id={id} visible={visible} setVisible={setVisible} handleAddProduct={handleAddProduct} />
        </div>
    );
}

export default ListProductFlowType;
