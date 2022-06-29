import { useContext, useEffect, useCallback } from 'react';
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../../index";
//containers
import Main from "../../layouts";
//components
import CartCollection from "../../components/carts/collection";
import Pagination from "../../components/pagination";
//styles
import styles from './index.module.scss'

const Collections = () => {


    const {collectionsPage} = useContext(Context)

    const getData = useCallback(async () => {
        collectionsPage.getProducts()
        window.scrollTo(0, 0)
    }, [collectionsPage])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Main path={[
            {page: 'Главная', path: '/'},
            {page: 'Коллекции'},
        ]}>
            <div className={styles.inner}>
                <h1>Коллекции</h1>
            </div>
            <div className={styles.grid}>
                {collectionsPage.collections.length ?
                    collectionsPage.collections.map((collection) =>
                        <CartCollection collection={collection} key={collection.id}/>
                    )
                    :
                    null
                }
            </div>
            {collectionsPage.collections.length ?
                <Pagination store={collectionsPage}/>
                :
                null
            }
        </Main>
    );
};

export default observer(Collections);