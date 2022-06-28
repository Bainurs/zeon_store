import { useContext, useEffect, useCallback } from 'react';
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../../index";
//containers
import Template from "../../layouts/index";
//components
import CardClothes from "../../components/carts/clothes";
import SliderProducts from "../../components/sliders/products";
//styles
import styles from "./index.module.scss";

const Favorites = () => {

    const {favorites} = useContext(Context)
    const {bestsellers} = useContext(Context)

    const getData = useCallback(async () => {
      await bestsellers.getProducts()
    }, [bestsellers])

    useEffect(() => {
        getData()
    }, [getData])


    return (
        <Template path={[
            {page: 'Главная', path: '/'},
            {page: 'Избранное'},
        ]}>
            <h1 className={styles.title}>Избранное</h1>
            <div className={styles.count}>
                <h4 className={styles.title}>
                    {!favorites.products.length ?
                        null
                        :
                        'У Вас пока нет избранных товаров'
                    }
                </h4>
                <span>
                    {favorites.products.length ?
                        favorites.products.length
                        :
                        null
                    }
                </span>
            </div>У Вас пока нет избранных товаров
            <div className={styles.grid}>
                {favorites.products.map((product) =>
                    <CardClothes product={product} key={product.id}/>
                )}
            </div>
            <h1 className={styles.extra}>Возможно вас заинтересует</h1>
            {!favorites.products.length ?
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

        </Template>
    );
};

export default observer(Favorites);