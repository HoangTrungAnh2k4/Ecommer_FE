import { Swiper, SwiperSlide } from 'swiper/react';
import ItemCard from './Item.card';

import 'swiper/css';
import { useUser } from '../hooks/UserContext';

function Slider({ list }) {
    const { userInfo } = useUser();

    return (
        <Swiper
            breakpoints={{
                576: {
                    width: 576,
                    slidesPerView: 2,
                },
                768: {
                    width: 768,
                    slidesPerView: 2,
                },
                992: {
                    width: 992,
                    slidesPerView: 3,
                },
                1200: {
                    width: 1260,
                    slidesPerView: 5,
                },
            }}
            slidesPerView={5}
        >
            {list &&
                list.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ItemCard
                            item={{
                                id: item.id,
                                image: item.image_url,
                                best_seller: item.best_seller,
                                name: item.name,
                                price: item.price,
                                discount: item.discount,
                                sold_quantity: item.sold_quantity,
                                role: userInfo?.role ?? 'user',
                            }}
                        />
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}

export default Slider;
