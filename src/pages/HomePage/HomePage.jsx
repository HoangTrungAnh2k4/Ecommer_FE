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

const list = new Array(10).fill(0);

function HomePage() {
    const [listCPU, setListCPU] = useState([]);
    const [listGPU, setListGPU] = useState([]);
    const [listMainboard, setListMainboard] = useState([]);
    const [listSSD, setListSSD] = useState([]);
    const [listMonitor, setListMonitor] = useState([]);
    const [listLaptop, setListLaptop] = useState([]);
    const [listPC, setListPC] = useState([]);

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
            } catch (error) {
                console.error(error);
            }
        };
        fetchListBestSeller();
    }, []);

    return (
        <div className="ư- container mx-auto">
            <div className="fixed left-0 z-50 w-[120px] animate-bounce">
                <img
                    src="https://nguyencongpc.vn/media/banner/27_Marbdc870976385c05318ea36291d1c6f4b.webp"
                    alt="Left banner"
                    className="h-auto w-full object-contain"
                />
            </div>

            <div className="fixed right-0 z-50 w-[120px] animate-bounce">
                <img
                    src="https://nguyencongpc.vn/media/banner/27_Mar40eaff2956861bc5a66a363e56b8ef71.webp"
                    alt="Right banner"
                    className="h-auto w-full object-contain"
                />
            </div>
            <div className="mb-6 h-[280px] w-full overflow-hidden rounded-xl">
                <img
                    src="https://nguyencongpc.vn/media/banner/17_Apre2a8f86ab726d7530efb2ff71335b32d.webp"
                    alt=""
                    className="w-fit bg-red-300 object-contain object-center"
                />
            </div>

            <Banner />

            <h1 className="mb-6 mt-12 text-xl font-semibold text-textColor1">DANH MỤC NỔI BẬT</h1>
            <Category className="" />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="block pt-[2px] text-xl font-semibold text-textColor1">PC THEO NHU CẦU</h1>
                <Link
                    to={'/list-product/pc'}
                    className="rounded-lg border px-2 py-1 hover:border-redColor hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            <Slider list={listPC} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="pt-[2px] text-xl font-semibold text-textColor1">CPU - BỘ VI XỬ LÝ</h1>
                <Link
                    to={'/list-product/cpu'}
                    className="rounded-lg border px-2 py-1 hover:border-redColor hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            <Slider list={listCPU} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="pt-[2px] text-xl font-semibold text-textColor1">VGA - CARD MÀN HÌNH</h1>
                <Link
                    to={'/list-product/gpu'}
                    className="rounded-lg border px-2 py-1 hover:border-redColor hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            <Slider list={listGPU} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="pt-[2px] text-xl font-semibold text-textColor1">MAINBOARD - BO MẠCH CHỦ</h1>
                <Link
                    to={'/list-product/mainboard'}
                    className="rounded-lg border px-2 py-1 hover:border-redColor hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            <Slider list={listMainboard} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="pt-[2px] text-xl font-semibold text-textColor1">MÀN HÌNH</h1>
                <Link
                    to={'/list-product/monitor'}
                    className="rounded-lg border px-2 py-1 hover:border-redColor hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            <Slider list={listMonitor} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="pt-[2px] text-xl font-semibold text-textColor1">LAPTOP</h1>
                <Link
                    to={'/list-product/laptop'}
                    className="rounded-lg border px-2 py-1 hover:border-redColor hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            <Slider list={listLaptop} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="pt-[2px] text-xl font-semibold text-textColor1">SSD</h1>
                <Link
                    to={'/list-product/ssd'}
                    className="rounded-lg border px-2 py-1 hover:border-redColor hover:text-redColor"
                >
                    Xem tất cả
                </Link>
            </div>
            <Slider list={listSSD} />

            <div className="mt-12 flex flex-wrap justify-between">
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-white p-4">
                    <TbTruckDelivery className="mr-3 mt-1 text-[50px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-white p-4">
                    <MdOutlineWifiProtectedSetup className="mr-3 mt-1 rotate-90 text-[46px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-white p-4">
                    <GiMoneyStack className="mr-3 mt-1 text-[50px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-white p-4">
                    <FaHeadphones className="mr-3 text-[40px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
