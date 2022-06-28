import {observer} from "mobx-react-lite";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
//swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import './index.css'
//components
import CardCollection from "../../carts/collection";

const SliderCollections = ({store}) => {
    return (
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={8}
            className="swCollections"
            freeMode={true}
            modules={[FreeMode]}
        >
            {store.collections.length ?
                store.collections.map((collection) =>
                    <SwiperSlide key={collection.id}>
                        <CardCollection collection={collection}/>
                    </SwiperSlide>
                )
                :
                null
            }
        </Swiper>
    );
};

export default observer(SliderCollections);