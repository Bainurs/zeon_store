import {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../../index";
//styles
import styles from './index.module.scss'
//components
import SearchDesktop from "../../components/search/desktop";
//icons
import LogoIcon from "../../assets/icons/LogoIcon";
import FavoriteIcon from "../../assets/icons/FavoriteIcon";
import CartIcon from "../../assets/icons/CartIcon";

const Header = () => {

    const {favorites} = useContext(Context)
    const {shoppingCart} = useContext(Context)

    const navigate = useNavigate()

    return (
        <>
            <div className={styles.header}>
                <div className={styles.__top}>
                    <div className={styles.__wrap}>
                        <div className={styles.pages}>
                            <Link to='/about-us'><span>О нас</span></Link>
                            <Link to='/collections'><span>Коллекции</span></Link>
                            <Link to='/news'><span>Новости</span></Link>
                        </div>
                        <div className={styles.contact}>
                            <span>Тел: </span>
                            <a href='tel:+996000000000'>+996 000 00 00 00</a>
                        </div>
                    </div>
                </div>
                <div className={styles.__bottom}>
                    <div className={styles.__wrap}>
                        <div>
                            <Link to='/'><LogoIcon/></Link>
                        </div>
                        <SearchDesktop/>
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
                        <div className={styles.separator}></div>
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
                </div>
            </div>
        </>
    );
};

export default observer(Header);