import {useContext, useState} from 'react';
import {Context} from "../../index";
//containers
import Template from "../../layouts";
//styles
import styles from './index.module.scss';
//components
import SliderOffers from "../../components/sliders/offers";
import GridProducts from "../../components/grids/products";
import GridCollections from "../../components/grids/collections";
import Benefits from "../../components/benefits";
//icons
import VectorChat from "../../assets/icons/VectorChat";
import Chat from "../../assets/icons/Chat";
import ChatCloseVector from "../../assets/icons/ChatCloseVector";
import Telegram2Icon from "../../assets/icons/Telegram2Icon";
import Whatsapp2Icon from "../../assets/icons/Whatsapp2Icon";
import Phone2Icon from "../../assets/icons/Phone2Icon";

const Home = () => {

    const {bestsellers} = useContext(Context)
    const {novelties} = useContext(Context)
    const {collectionsMain} = useContext(Context)

    const [isActive, setActive] = useState(false)

    return (
        <Template>
            <div className={styles.contactsWrap}>
                <div className={styles.contact}>
                    <VectorChat onClick={() => window.scrollTo(0, 0)}/>
                    {isActive ?
                        <>
                        <ChatCloseVector onClick={() => setActive(false)}/>
                        <div className={styles.socialWrap}>
                            <div className={styles.socials}>
                                <Telegram2Icon/>
                                <Whatsapp2Icon/>
                                <Phone2Icon/>
                            </div>
                        </div>
                        </>
                        :
                        <Chat onClick={() => setActive(true)}/>
                    }

                </div>
            </div>
            <SliderOffers/>
            <GridProducts
                store={bestsellers}
                title={'Хит продаж'}
            />
            <GridProducts
                store={novelties}
                title={'Новинки'}
            />
            <GridCollections
                store={collectionsMain}
                title={'Коллекции'}
            />
            <Benefits/>
            {/*<ModalCall/>*/}
            {/*<ModalCallAccess/>*/}
        </Template>
    );
};

export default Home;