import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Slider from '../../components/ui/Slider';
import Category from './Category';
import Banner from './Banner';
import { getListBestSellerAPI } from '../../api/userAPI';
import { FaHeadphones } from 'react-icons/fa6';
import { GiMoneyStack } from 'react-icons/gi';
import { MdOutlineWifiProtectedSetup } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';

function HomePage() {
    const [listCPU, setListCPU] = useState([]);
    const [listGPU, setListGPU] = useState([]);
    const [listMainboard, setListMainboard] = useState([]);
    const [listSSD, setListSSD] = useState([]);
    const [listMonitor, setListMonitor] = useState([]);
    const [listLaptop, setListLaptop] = useState([]);
    const [listPC, setListPC] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListBestSeller = async () => {
            try {
                const [cpuRes, gpuRes, mainboardRes, ssdRes, monitorRes, laptopRes, pcRes] = await Promise.allSettled([
                    getListBestSellerAPI('cpu'),
                    getListBestSellerAPI('gpu'),
                    getListBestSellerAPI('mainboard'),
                    getListBestSellerAPI('ssd'),
                    getListBestSellerAPI('monitor'),
                    getListBestSellerAPI('laptop'),
                    getListBestSellerAPI('pc'),
                ]);

                if (cpuRes.status === 'fulfilled') setListCPU(cpuRes.value.data);
                if (gpuRes.status === 'fulfilled') setListGPU(gpuRes.value.data);
                if (mainboardRes.status === 'fulfilled') setListMainboard(mainboardRes.value.data);
                if (ssdRes.status === 'fulfilled') setListSSD(ssdRes.value.data);
                if (monitorRes.status === 'fulfilled') setListMonitor(monitorRes.value.data);
                if (laptopRes.status === 'fulfilled') setListLaptop(laptopRes.value.data);
                if (pcRes.status === 'fulfilled') setListPC(pcRes.value.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchListBestSeller();
    }, []);

    return (
        <div className="mx-auto ư- container">
            <div className="mb-6 rounded-xl w-full h-[280px] overflow-hidden">
                <img
                    src="https://nguyencongpc.vn/media/banner/17_Apre2a8f86ab726d7530efb2ff71335b32d.webp"
                    alt=""
                    className="bg-red-300 w-fit object-center object-contain"
                />
            </div>

            <Banner />

            <h1 className="mt-12 mb-6 font-semibold text-textColor1 text-xl">DANH MỤC NỔI BẬT</h1>
            <Category className="" />

            <div className="flex justify-between items-center mt-12 mb-6">
                <h1 className="block pt-[2px] font-semibold text-textColor1 text-xl">PC THEO NHU CẦU</h1>
                <Link
                    to={'/list-product/pc'}
                    className="px-2 py-1 border hover:border-redColor rounded-lg hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="border-4 border-yellow-600 border-t-transparent rounded-full w-16 h-16 animate-spin" />
                </div>
            ) : (
                <Slider list={listPC} />
            )}

            <div className="flex justify-between items-center mt-12 mb-6">
                <h1 className="pt-[2px] font-semibold text-textColor1 text-xl">VGA - CARD MÀN HÌNH</h1>
                <Link
                    to={'/list-product/gpu'}
                    className="px-2 py-1 border hover:border-redColor rounded-lg hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            {loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="border-4 border-yellow-600 border-t-transparent rounded-full w-16 h-16 animate-spin" />
                </div>
            ) : (
                <Slider list={listGPU} />
            )}

            <div className="flex justify-between items-center mt-12 mb-6">
                <h1 className="pt-[2px] font-semibold text-textColor1 text-xl">CPU - BỘ VI XỬ LÝ</h1>
                <Link
                    to={'/list-product/cpu'}
                    className="px-2 py-1 border hover:border-redColor rounded-lg hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="border-4 border-yellow-600 border-t-transparent rounded-full w-16 h-16 animate-spin" />
                </div>
            ) : (
                <Slider list={listCPU} />
            )}

            <div className="flex justify-between items-center mt-12 mb-6">
                <h1 className="pt-[2px] font-semibold text-textColor1 text-xl">MAINBOARD - BO MẠCH CHỦ</h1>
                <Link
                    to={'/list-product/mainboard'}
                    className="px-2 py-1 border hover:border-redColor rounded-lg hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            {loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="border-4 border-yellow-600 border-t-transparent rounded-full w-16 h-16 animate-spin" />
                </div>
            ) : (
                <Slider list={listMainboard} />
            )}

            <div className="flex justify-between items-center mt-12 mb-6">
                <h1 className="pt-[2px] font-semibold text-textColor1 text-xl">MÀN HÌNH</h1>
                <Link
                    to={'/list-product/monitor'}
                    className="px-2 py-1 border hover:border-redColor rounded-lg hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            {loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="border-4 border-yellow-600 border-t-transparent rounded-full w-16 h-16 animate-spin" />
                </div>
            ) : (
                <Slider list={listMonitor} />
            )}

            <div className="flex justify-between items-center mt-12 mb-6">
                <h1 className="pt-[2px] font-semibold text-textColor1 text-xl">LAPTOP</h1>
                <Link
                    to={'/list-product/laptop'}
                    className="px-2 py-1 border hover:border-redColor rounded-lg hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            {loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="border-4 border-yellow-600 border-t-transparent rounded-full w-16 h-16 animate-spin" />
                </div>
            ) : (
                <Slider list={listLaptop} />
            )}

            <div className="flex justify-between items-center mt-12 mb-6">
                <h1 className="pt-[2px] font-semibold text-textColor1 text-xl">SSD</h1>
                <Link
                    to={'/list-product/ssd'}
                    className="px-2 py-1 border hover:border-redColor rounded-lg hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            {loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="border-4 border-yellow-600 border-t-transparent rounded-full w-16 h-16 animate-spin" />
                </div>
            ) : (
                <Slider list={listSSD} />
            )}

            <div className="flex flex-wrap justify-between mt-12">
                <div className="flex flex-shrink-0 items-center bg-white p-4 border border-[#b8b8b8] rounded-lg">
                    <TbTruckDelivery className="mt-1 mr-3 text-[50px]" />
                    <div>
                        <p className="font-semibold text-sm">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-textColor2 text-sm">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center bg-white p-4 border border-[#b8b8b8] rounded-lg">
                    <MdOutlineWifiProtectedSetup className="mt-1 mr-3 text-[46px] rotate-90" />
                    <div>
                        <p className="font-semibold text-sm">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-textColor2 text-sm">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center bg-white p-4 border border-[#b8b8b8] rounded-lg">
                    <GiMoneyStack className="mt-1 mr-3 text-[50px]" />
                    <div>
                        <p className="font-semibold text-sm">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-textColor2 text-sm">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center bg-white p-4 border border-[#b8b8b8] rounded-lg">
                    <FaHeadphones className="mr-3 text-[40px]" />
                    <div>
                        <p className="font-semibold text-sm">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-textColor2 text-sm">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
