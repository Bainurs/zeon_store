import { useContext, useEffect, useState, useCallback } from 'react';
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../../index";
//containers
import Main from "../../layouts";
//components
import CartBasketInfo from "../../components/carts/basket/info";
import CartBasketInfoMobile from "../../components/carts/basket/info/mobile";
import BasketModal from "../../components/modals/basket";
import ModalCallAccess from "../../components/modals/modalCallAccess";
import CartBasket from "../../components/carts/basket/cart";
import SliderProducts from "../../components/sliders/products";
//styles
import styles from './index.module.scss'


const Cart = () => {

    const {shoppingCart} = useContext(Context)
    const {bestsellers} = useContext(Context)

    const [isOpen, setOpen] = useState(false)
    const [accessModal, setAccessModal] = useState(false)

    const getData = useCallback(async() => {
        await bestsellers.getProducts()
    }, [bestsellers])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Main path={[
            {page: 'Главная', path: '/'},
            {page: 'Корзина'},
        ]}>
            {shoppingCart.products.length ?
                <div className={styles.wrap}>
                    <div className={styles.carts}>
                        {shoppingCart.products.map((product) =>
                            <CartBasket product={product} key={product.product_color.id}/>
                        )}
                    </div>
                    <CartBasketInfo setOpen={setOpen}/>
                    <CartBasketInfoMobile setOpen={setOpen}/>
                    {isOpen ?
                        <BasketModal isOpen={isOpen} setOpen={setOpen} accessModal={setAccessModal}/>
                        :
                        null
                    }
                    {accessModal ?
                        <ModalCallAccess setModal={setAccessModal}/>
                        :
                        null
                    }
                </div>
                :
                <>
                    <h1 className={styles.title}>Корзина</h1>
                    <div className={styles.count}>
                        <h4 className={styles.title}>
                            {!shoppingCart.products.length ?
                                <span>У Вас пока нет товаров в корзине</span>
                                :
                                null
                            }
                        </h4>
                    </div>
                    <h1 className={styles.extra}>Возможно вас заинтересует</h1>
                    {!shoppingCart.products.length ?
                        <div className={styles.slider}>
                            {bestsellers.products.length ?
                                <SliderProducts store={bestsellers}/>
                                :
                                null
                            }
                        </div>
                        :
                        null
                    }
                </>
            }
        </Main>
    );
};

export default observer(Cart);