import { useEffect, useCallback } from 'react';
import {observer} from "mobx-react-lite";
//styles
import styles from './index.module.scss'
//components
import CardClothes from "../../carts/clothes/index";
import SliderProducts from "../../sliders/products/index";

const GridProducts = ({title, store, ...props}) => {

    const getData = useCallback(async() => {
        await store.getProducts()
    }, [store])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className={styles.inner}>
            <h1 className={styles.h1}>{title}</h1>
            <div className={styles.collection}>
                {store.products.length ?
                    store.products.map((product) =>
                        <CardClothes product={product} key={product.id}/>
                    )
                :
                    null
                }
            </div>
            <div className={styles.slider}>
                <SliderProducts store={store}/>
            </div>
            <div className='center'>
                <button
                    className={styles.button}
                    onClick={() => store.getNext()}
                >
                    Еще
                </button>
            </div>
        </div>
    );
};

export default observer(GridProducts);