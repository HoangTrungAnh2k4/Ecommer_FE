import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Banner() {
    const list = [
        'https://nguyencongpc.vn/media/banner/27_Mar8548551a382f4409018e150f5b4945fe.webp',
        'https://nguyencongpc.vn/media/banner/27_Marb2bb9f3556fb704492306809374ebf2c.webp',
        'https://nguyencongpc.vn/media/banner/27_Marf1b77a9ec940fcf31fa7359fe29e35f1.webp',
        'https://nguyencongpc.vn/media/banner/27_Mar8548551a382f4409018e150f5b4945fe.webp',
    ];
    return (
        <div className="relative z-0">
            <Swiper spaceBetween={20} slidesPerView={2}>
                {list &&
                    list.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={item} alt="" className="rounded-lg" />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default Banner;
