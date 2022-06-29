import React, {useContext, useEffect, useState, useCallback} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
//styles
import styles from './index.module.scss'
//icons
import LogoIcon from "../../../assets/icons/LogoIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";
import FavoriteIcon from "../../../assets/icons/FavoriteIcon";
import CartIcon from "../../../assets/icons/CartIcon";
import Telegram2Icon from "../../../assets/icons/Telegram2Icon";
import Whatsapp2Icon from "../../../assets/icons/Whatsapp2Icon";
import Phone2Icon from "../../../assets/icons/Phone2Icon";
//components
import SearchMobile from "../../../components/search/mobile";
import ModalCall from '../../../components/modals/modalCall';
import ModalCallAccess from '../../../components/modals/modalCallAccess';
import axios from "axios";

const HeaderMobile = () => {

    const {search} = useContext(Context)

    const navigate = useNavigate();

    const [isActive, setActive] = useState(false)
    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const [access, setAccess] = useState(false)

    function handlerSearch(bool) {
        search.setModalMobile(bool)
        search.setModalMobileBack(bool)
    }

    const getData = useCallback(async () => {
        const response = await axios.get('http://localhost:8000/contacts/')
        setData(response.data[0])
        setLoading(false)
    }, [setData, setLoading])

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.wrap}>
            <div className={styles.inner}>
                {search.modalSearchMobile ?
                    <SearchMobile/>
                    :
                    null
                }
                <div
                    className={styles.burger}
                    onClick={(e) => {
                        setActive(true)
                    }}
                >
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <LogoIcon onClick={() => navigate('/')} style={{width: '99px', cursor: 'pointer'}}/>
                <div>
                    {search.modalSearchMobile ?
                        <CloseIcon
                            style={{width: 18, height: 18, cursor: 'pointer'}}
                            onClick={() => handlerSearch(false)}

                        />
                        :
                        <SearchIcon
                            style={{cursor: 'pointer'}}
                            onClick={() => handlerSearch(true)}
                        />
                    }
                </div>
                <div
                    className={isActive ? `${styles.windowBack} ${styles.active}` : styles.windowBack}
                    onClick={() => {
                        setActive(false)
                    }}
                >
                    <div
                        className={styles.window}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <div className={styles.topNav}>
                            <div className={styles.title}>
                                <h3>Меню</h3>
                                <CloseIcon
                                    style={{cursor: 'pointer'}}
                                    onClick={() => {
                                        setActive(false)
                                    }}
                                />
                            </div>
                            <div className={styles.section}>
                                <Link to="/about">О нас</Link>
                                <Link to="/collections">Коллекции</Link>
                                <Link to="/news">Новости</Link>
                            </div>
                            <div className={styles.separator}></div>
                            <div className={styles.favorite}>
                                <FavoriteIcon style={{width: 16, height: 16}}/>
                                <Link to="/favorites">Избранное</Link>
                            </div>
                            <div className={styles.productCart}>
                                <CartIcon style={{width: 16, height: 16}}/>
                                <Link to="/cart">Корзина</Link>
                            </div>
                        </div>
                        <div className={styles.bottomNav}>
                            <div className={styles.contactTitle}>
                                Свяжитесь с нами
                            </div>
                            <div className={styles.contact}>
                                <span>Тел:</span>
                                <a href='tel:+996000000000'>+996 000 00 00 00</a>
                            </div>
                            <div className={styles.social}>
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
                    </div>
                </div>
            </div>
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
        </div>
    );
};

export default observer(HeaderMobile);