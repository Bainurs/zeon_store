import {useContext, useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import {Context} from "../../index";
//containers
import Main from "../../layouts";
//styles
import styles from './index.module.scss';
//components
import SliderOffers from "../../components/sliders/offers";
import GridProducts from "../../components/grids/products";
import GridCollections from "../../components/grids/collections";
import Benefits from "../../components/benefits";
import ModalCall from '../../components/modals/modalCall';
import ModalCallAccess from '../../components/modals/modalCallAccess';
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
    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const [access, setAccess] = useState(false)

    const getData = useCallback(async () => {
        window.scrollTo(0, 0)
        const response = await axios.get('http://localhost:8000/contacts/')
        setData(response.data[0])
        setLoading(false)
    }, [setData, setLoading])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Main>
            <div className={styles.contactsWrap}>
                <div className={styles.contact}>
                    <VectorChat onClick={() => window.scrollTo(0, 0)}/>
                    {isActive ?
                        <>
                        <ChatCloseVector onClick={() => setActive(false)}/>
                        <div className={styles.socialWrap}>
                            <div className={styles.socials}>
                                {!isLoading ?
                                    <>
                                        <a href={data.telegram} target="_blank" rel="noreferrer"><Telegram2Icon/></a>
                                        <a href={data.whatsapp} target="_blank" rel="noreferrer"><Whatsapp2Icon/></a>
                                        <span onClick={() => {
                                            setModal(true)
                                            console.log('click')
                                            setActive(false)
                                        }}><Phone2Icon/></span>
                                    </>
                                    :
                                    null
                                }

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

            {modal ?
                <ModalCall isActive={modal} setActive={setModal} setAccess={setAccess}/>
                :
                null
            }
            {access ?
                <ModalCallAccess setModal={setAccess}/>
                :
                null
            }
        </Main>
    );
};

export default Home;