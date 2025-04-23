import { FaPlus, FaMinus, FaHeadphones, FaArrowsRotate } from 'react-icons/fa6';
import { GiTakeMyMoney, GiMoneyStack, GiReceiveMoney } from 'react-icons/gi';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlineWifiProtectedSetup, MdOutlineFiberNew } from 'react-icons/md';
import { AiFillThunderbolt } from 'react-icons/ai';

import { Swiper, SwiperSlide } from 'swiper/react';

import Evaluation from './Evaluation';
import Specification from './Specification';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEquipmentDetailAPI, getRateAPI, addToCartAPI } from '../../api/userAPI';
import { toast } from 'react-toastify';

const mockImage = {
    pc: [
        'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-005.jpg',
        'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-006.jpg',
        'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-003.jpg',
        'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-001.jpg',
        'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-001.jpg',
        'https://nguyencongpc.vn/media/product/250-26979-z6465930229541_3235e7f7abde51fda44d8f2dd562ff4a.jpg',
        'https://nguyencongpc.vn/media/product/250-26979-z6465930229542_5112c8d6dbfbc568c587b3873723cb5f.jpg',
    ],
};

function DetailPage() {
    const { id } = useParams();
    const [listRate, setListRate] = useState([]);
    const [equipmentInfor, setEquipmentInfor] = useState({});
    const [quantityChoose, setQuantityChoose] = useState(1);
    const [ImagePrimary, setImagePrimary] = useState('');

    const mockImage = {
        pc: [
            equipmentInfor.image_url, // Thay thế bằng URL hình ảnh của sản phẩ
            'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-005.jpg',
            'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-006.jpg',
            'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-003.jpg',
            'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-001.jpg',
            'https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g-001.jpg',
            'https://nguyencongpc.vn/media/product/250-26979-z6465930229541_3235e7f7abde51fda44d8f2dd562ff4a.jpg',
            'https://nguyencongpc.vn/media/product/250-26979-z6465930229542_5112c8d6dbfbc568c587b3873723cb5f.jpg',
        ],
        cpu: [
            equipmentInfor.image_url,
            'https://nguyencongpc.vn/media/product/250-23429-cpu-intel-core-i9-13900kf-1.jpg',
            'https://nguyencongpc.vn/media/product/250-23429-cpu-intel-core-i9-13900kf-2.jpg',
            'https://nguyencongpc.vn/media/product/250-23429-cpu-intel-core-i9-13900kf-3.jpg',
            'https://nguyencongpc.vn/media/product/250-23429-cpu-intel-core-i9-13900kf-4.jpg',
            'https://nguyencongpc.vn/media/product/250-23429-cpu-intel-core-i9-13900kf-5.jpg',
        ],
        gpu: [
            equipmentInfor.image_url,
            'https://nguyencongpc.vn/media/product/250-18699-colorful-igame-geforce-rtx-3060-ultra-w-oc-12g-v-5.jpg',
            'https://nguyencongpc.vn/media/product/250-18699-card-man-hinh-colorful-igame-geforce-rtx-3060-ultra-w-oc-12g-v.jpg',
            'https://nguyencongpc.vn/media/product/250-21173-card-do-hoa-gigabyte-radeon-rx-6600-eagle-8g-5.jpg',
            'https://nguyencongpc.vn/media/product/250-21173-card-do-hoa-gigabyte-radeon-rx-6600-eagle-8g-2.jpg',
            'https://nguyencongpc.vn/media/product/250-18369-inno3d-geforce-rtx-3060-twin-x2-1.jpg',
        ],
        mainboard: [
            equipmentInfor.image_url,
            'https://nguyencongpc.vn/media/product/250-25551-mai-board-z790-asrock-pg-lighning-wifi-15.jpg',
            'https://nguyencongpc.vn/media/product/250-25551-mai-board-z790-asrock-pg-lighning-wifi-5.jpg',
            'https://nguyencongpc.vn/media/product/250-25551-mai-board-z790-asrock-pg-lighning-wifi-23.jpg',
            'https://nguyencongpc.vn/media/product/250-25551-mai-board-z790-asrock-pg-lighning-wifi-16.jpg',
            'https://nguyencongpc.vn/media/product/250-25551-mai-board-z790-asrock-pg-lighning-wifi-28.jpg',
        ],
        monitor: [
            equipmentInfor.image_url,
            'https://nguyencongpc.vn/media/product/250-26969-vinh--28-.png',
            'https://nguyencongpc.vn/media/product/250-26969-vinh--29-.png',
            'https://nguyencongpc.vn/media/product/250-26969-vinh--30-.png',
            'https://nguyencongpc.vn/media/product/250-24655-m--n-h--nh-philips-24m1n3200z-74-4.jpg',
            'https://nguyencongpc.vn/media/product/250-24655-m--n-h--nh-philips-24m1n3200z-74-6.jpg',
        ],
        laptop: [
            equipmentInfor.image_url,
            'https://nguyencongpc.vn/media/product/250-26267-47470_acer_gaming_nitro_v_anv15--5-.png',
            'https://nguyencongpc.vn/media/product/250-26267-47470_acer_gaming_nitro_v_anv15--2-.png',
            'https://nguyencongpc.vn/media/product/250-26267-47470_acer_gaming_nitro_v_anv15--1-.png',
            'https://nguyencongpc.vn/media/product/250-26506-47728_laptop_gigabyte_g5_mf5_52v--4-.png',
            'https://nguyencongpc.vn/media/product/250-26506-47728_laptop_gigabyte_g5_mf5_52v--2-.png',
        ],
        ssd: [
            equipmentInfor.image_url,
            'https://nguyencongpc.vn/media/product/250-19221-ssd-samsung-980-500gb-3.jpg',
            'https://nguyencongpc.vn/media/product/250-19221-ssd-samsung-980-500gb-2.jpg',
            'https://nguyencongpc.vn/media/product/250-19221-ssd-samsung-980-500gb-1.jpg',
            'https://nguyencongpc.vn/media/product/250-19221-ssd-samsung-980-500gb-3.jpg',
            'https://nguyencongpc.vn/media/product/250-19221-ssd-samsung-980-500gb-2.jpg',
            'https://nguyencongpc.vn/media/product/250-19221-ssd-samsung-980-500gb-1.jpg',
        ],
    };

    const navigate = useNavigate();

    const handleQuantityChoose = (value) => {
        if (value === 'plus') {
            setQuantityChoose((prev) => prev + 1);
        } else if (value === 'minus') {
            setQuantityChoose((prev) => (prev > 0 ? prev - 1 : 0));
        }
    };

    const handleAddToCart = async () => {
        const data = {
            equipmentId: id,
            quantity: quantityChoose,
        };
        if (quantityChoose <= 0) {
            toast.error('Vui lòng chọn số lượng sản phẩm');
            return;
        }

        try {
            const response = await addToCartAPI(data);

            if (response.data) {
                toast.success('Thêm vào giỏ hàng thành công');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            if (error.status === 409) {
                toast.error('Sản phẩm đã có trong giỏ hàng');
            }
        }
    };

    const getRateData = async () => {
        try {
            const response = await getRateAPI(id);

            if (response.data) {
                setListRate(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const getEquipmentInfor = async () => {
            try {
                const response = await getEquipmentDetailAPI(id);

                if (response.data) {
                    setEquipmentInfor(response.data);
                    setImagePrimary(response.data.image_url);
                }
            } catch (err) {
                console.log(err);
            }
        };

        getRateData();
        getEquipmentInfor();
    }, [id]);

    // Add these states near the top of the component with other useState declarations
    const [flashSaleTime, setFlashSaleTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Add this useEffect after your existing useEffect
    useEffect(() => {
        // Generate random time between 1-10 hours
        const randomHours = Math.floor(Math.random() * 10) + 1;
        const endTime = new Date().getTime() + randomHours * 60 * 60 * 1000;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setFlashSaleTime({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <div className="flex rounded-lg border bg-white px-4 py-6 shadow">
                <div className="w-[400px] flex-1">
                    <div className="flex items-center justify-center">
                        <img src={ImagePrimary} alt="" className="h-[360px] w-3/5 object-contain" />
                    </div>
                    <div className="mx-auto mt-8 flex w-[90%] pb-4">
                        <Swiper spaceBetween={10} slidesPerView={5}>
                            {mockImage[equipmentInfor.type]?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setImagePrimary(item);
                                        }}
                                        className="flex size-[90px] items-center justify-center rounded-lg border border-[#b8b8b8] p-[1px]"
                                    >
                                        <img src={item} alt="" className="rounded-lg" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="flex-1 pl-4">
                    <h2 className="text-xl font-semibold text-black">{equipmentInfor.name || 'Tên sản phẩm'}</h2>
                    <div className="mt-3 flex">
                        <div className="mr-4 border-r-2 border-gray-600 pr-4 text-sm">
                            <span className="text-textColor2">Bảo hành: </span>
                            <span className="text-redColor">36 tháng</span>
                        </div>

                        <div className="text-sm">
                            <span className="text-textColor2">Tình trạng: </span>
                            {equipmentInfor.stock_quantity ? (
                                <span className="text-green-600">Còn hàng</span>
                            ) : (
                                <span className="text-redColor">Hết hàng</span>
                            )}
                        </div>
                    </div>
                    {/* flash sale */}
                    <div className="flash_sale mt-4 flex h-[60px] items-center justify-between gap-4 overflow-hidden rounded-lg border-2 border-redColor pr-6">
                        <div className="flex h-full items-center gap-2 bg-redColor px-4 py-2 text-white">
                            <AiFillThunderbolt className="text-3xl" />
                            <span className="flex-shrink-0 text-lg font-semibold">FLASH SALE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center rounded bg-[#2b3440] px-2 py-1 text-white">
                                {String(flashSaleTime.seconds).padStart(2, '0')}
                            </div>
                            <span className="text-lg font-bold">:</span>
                            <div className="flex items-center justify-center rounded bg-[#2b3440] px-2 py-1 text-white">
                                {String(flashSaleTime.minutes).padStart(2, '0')}
                            </div>
                            <span className="text-lg font-bold">:</span>
                            <div className="flex items-center justify-center rounded bg-[#2b3440] px-2 py-1 text-white">
                                {String(flashSaleTime.hours).padStart(2, '0')}
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex-col justify-between rounded-lg text-sm">
                            <span className="text-textColor1">Còn 5/15 sản phẩm</span>
                            <div className="mt-2 h-2 w-24 rounded-full bg-[#fecccc]">
                                <div className="h-full w-1/3 rounded-full bg-[#ffb22f]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-4 rounded-xl border border-[#b8b8b8] bg-[#f7f9fb] p-4">
                        <span className="text-3xl font-semibold text-redColor">
                            {(equipmentInfor.price * (1 - equipmentInfor.discount / 100)).toLocaleString('vi-VN')}
                        </span>
                        <span className="text-textColor2 line-through">
                            {equipmentInfor?.price?.toLocaleString('vi-VN') || '0'}
                        </span>
                        <span className="rounded-md border border-redColor px-4 py-1 text-sm text-redColor">
                            {equipmentInfor.discount || 0}%
                        </span>
                    </div>
                    <div className="z-0 mt-6 flex items-center gap-4">
                        <p className="font-semibold">Số lượng:</p>

                        <div className="flex max-w-[8rem] items-center">
                            <button
                                onClick={() => {
                                    handleQuantityChoose('minus');
                                }}
                                className="h-11 rounded-s-lg border border-gray-300 p-3 hover:bg-gray-100"
                            >
                                <FaMinus />
                            </button>
                            <span className="flex h-11 w-20 items-center justify-center border border-x-0 border-gray-300 py-2.5 text-center text-gray-900 outline-none">
                                {quantityChoose}
                            </span>
                            <button
                                onClick={() => {
                                    handleQuantityChoose('plus');
                                }}
                                className="h-11 rounded-e-lg border border-gray-300 p-3 hover:bg-gray-100"
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-1/2 rounded-lg border border-redColor py-2 text-redColor hover:shadow-inner hover:shadow-redColor"
                        >
                            THÊM VÀO GIỎ HÀNG
                        </button>
                        <button
                            onClick={() => {
                                navigate('/checkout');
                                sessionStorage.setItem(
                                    'listCheckout',
                                    JSON.stringify([{ ...equipmentInfor, quantity: quantityChoose }]),
                                );
                            }}
                            className="w-1/2 rounded-lg bg-redColor from-redColor to-[#e8d01e] text-white hover:bg-gradient-to-tr"
                        >
                            MUA NGAY
                        </button>
                    </div>
                    <h3 className="mt-6 font-semibold text-textColor2">YÊN TÂM MUA HÀNG</h3>
                    <ul className="mt-4 flex flex-wrap gap-x-16 gap-y-4">
                        <li className="flex w-1/2 items-center gap-2">
                            <GiTakeMyMoney className="text-2xl text-redColor" />
                            <p className="text-sm text-textColor2">Cam kết giá tốt nhất thị trường.</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <MdOutlineFiberNew className="text-3xl text-redColor" />
                            <p className="text-sm text-textColor2">Sản phẩm mới 100%.</p>
                        </li>

                        <li className="flex w-1/2 items-center gap-2">
                            <GiReceiveMoney className="text-2xl text-redColor" />
                            <p className="text-sm text-textColor2">Hỗ trợ trả góp - Thủ tục nhanh gọn.</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaArrowsRotate className="text-2xl text-redColor" />
                            <p className="text-sm text-textColor2">Lỗi 1 đổi 1 ngay lập tức.</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 flex gap-4">
                <div className="w-3/5">
                    <Evaluation
                        equipmenId={parseInt(id)}
                        listRate={listRate}
                        setListRate={setListRate}
                        getRateData={getRateData}
                    />
                </div>
                <div className="w-2/5">
                    <Specification />
                </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-between">
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-[#f7f9fb] p-4">
                    <TbTruckDelivery className="mr-3 mt-1 text-[50px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-[#f7f9fb] p-4">
                    <MdOutlineWifiProtectedSetup className="mr-3 mt-1 rotate-90 text-[46px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-[#f7f9fb] p-4">
                    <GiMoneyStack className="mr-3 mt-1 text-[50px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-[#f7f9fb] p-4">
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

export default DetailPage;
