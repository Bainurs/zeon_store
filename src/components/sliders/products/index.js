import {observer} from "mobx-react-lite";
//components
import {Swiper, SwiperSlide} from "swiper/react";
import CardClothes from "../../carts/clothes/index";
//slider styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import './index.css'

    const SliderProducts = ({store}) => {
    return (
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={8}
            className="swProducts"
            freeMode={true}
        >
            {store.products.length ?
                store.products.map((product) =>
                    <SwiperSlide key={product.id}>
                        <CardClothes product={product}/>
                    </SwiperSlide>
                )
                :
                null
            }
        </Swiper>
    );
};

export default observer(SliderProducts);