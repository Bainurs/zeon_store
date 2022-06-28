import { useEffect, useCallback } from 'react';
import {observer} from "mobx-react-lite";
//styles
import styles from './index.module.scss'
//components
import CartCollection from "../../carts/collection/index";
import SliderCollections from "../../sliders/collections/index";

const GridCollections = ({title, store, ...props}) => {

    const getData = useCallback(async() => {
       await store.getProducts() 
    }, [store])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className={styles.inner}>
            {title ? <h1 className={styles.h1}>{title}</h1> : null}
            <div className={styles.collection}>
                {store.collections.length ?
                    store.collections.map((collection) =>
                        <CartCollection collection={collection} key={collection.id}/>
                    )
                    :
                    null
                }
            </div>
            <SliderCollections store={store}/>
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

export default observer(GridCollections);