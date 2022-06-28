//swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
//swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";
//static img
import img from '../../../assets/images/Offer.jpg'

export default function SliderOffers() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="swOffers"
            >
                <SwiperSlide><img src={img} alt="" style={{paddingBottom: '16px'}}/></SwiperSlide>
                <SwiperSlide><img src={img} alt="" style={{paddingBottom: '16px'}}/></SwiperSlide>
                <SwiperSlide><img src={img} alt="" style={{paddingBottom: '16px'}}/></SwiperSlide>
                <SwiperSlide><img src={img} alt="" style={{paddingBottom: '16px'}}/></SwiperSlide>
                <SwiperSlide><img src={img} alt="" style={{paddingBottom: '16px'}}/></SwiperSlide>
                <SwiperSlide><img src={img} alt="" style={{paddingBottom: '16px'}}/></SwiperSlide>
                <SwiperSlide><img src={img} alt="" style={{paddingBottom: '16px'}}/></SwiperSlide>
                <SwiperSlide><img src={img} alt="" style={{paddingBottom: '16px'}}/></SwiperSlide>
            </Swiper>
        </>
    );
}
