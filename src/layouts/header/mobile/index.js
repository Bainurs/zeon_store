import {useCallback, useEffect, useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//context store
import {Context} from "../../../index";
//styles
import styles from './index.module.scss';
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

const HeaderMob = () => {
    const {favorites} = useContext(Context)
    const {shoppingCart} = useContext(Context)
    const navigate = useNavigate()
    const {search} = useContext(Context)
    
    // const [mobSearch, setMobSearch] = useState(false)
    const [isActive, setActive] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()
    

    const load = useCallback(async () => {
        const response = await axios.get('http://localhost:8000/contacts/')
        setData(response.data[0])
        setLoading(false)
    }, [setData, setLoading]) 

    const handlerSearch = (bool) => {
        search.setModalMobile(bool)
        search.setModalMobileBack(bool)
    }
    
    useEffect(() => {
        load()
    }, [load])

    return (
        <div className={styles.wrap}>
            <div className={styles.inner}>
                {search.modalMobile ?
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
                <LogoIcon style={{width: '99px'}}/>
                <div>
                    {search.modalMobile ?
                        <CloseIcon
                            style={{width: 18, height: 18}}
                            onClick={() => handlerSearch(false)}
                        />
                        :
                        <SearchIcon onClick={() => handlerSearch(true)}/>
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
                                    onClick={() => {
                                        setActive(false)
                                    }}
                                />
                            </div>
                            <div className={styles.section}>
                                <Link to='/about-us'><span>О нас</span></Link>
                                <Link to='/collections'><span>Коллекции</span></Link>
                                <Link to='/news'><span>Новости</span></Link>
                            </div>
                            <div className={styles.separator}></div>
                            <div
                              onClick={() => navigate('/favorites/')}
                              className={styles.favorite}
                            >
                                <div className={styles.icon}>
                                    <FavoriteIcon/>
                                    {favorites.products.length ?
                                        <div className={`${styles.indicate} ${styles.indicatorFavorite}`}></div>
                                        :
                                        null
                                    }
                                </div>
                                <span>Избранное</span>
                            </div>
                            <div
                              onClick={() => navigate('/cart/')}
                              className={styles.productCart}
                            >
                                <div className={styles.icon}>
                                    <CartIcon style={{fill: '#515151'}}/>
                                    {shoppingCart.products.length ?
                                        <div className={`${styles.indicate} ${styles.indicatorCart}`}></div>
                                        :
                                        null
                                    }
                                </div>
                                <span>Корзина</span>
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
                            {
                              !isLoading && data ?
                                  <>
                                      <div className={styles.social}>
                                          <a href={data.telegram} target="_blank" rel="noreferrer"><Telegram2Icon/></a>
                                          <a href={data.whatsapp} target="_blank" rel="noreferrer"><Whatsapp2Icon/></a>
                                          <a href={`tel:${data.phone2}`}><Phone2Icon/></a>
                                      </div>
                                  </>
                                  : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMob;