//swiper components
import {Swiper, SwiperSlide} from "swiper/react";
//slider styles
import './index.css'

const SliderImages = ({store}) => {

    return (
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={8}
            className="swImages"
            freeMode={true}
        >
            {store.product.product_colors.map((color) =>
                <SwiperSlide key={color.id}>
                    <img src={color.image} style={{maxWidth: 262}} alt=""/>
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default SliderImages;