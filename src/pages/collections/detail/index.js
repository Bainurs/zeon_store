import { useContext, useEffect, useCallback } from 'react';
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import axios from "axios";
//context store
import {Context} from "../../../index";
//containers
import Template from "../../../layouts";
//styles
import styles from './index.module.scss'
//components
import SliderProducts from "../../../components/sliders/products";
import CardClothes from "../../../components/carts/clothes";
import Pagination from "../../../components/pagination";

const CollectionDetail = () => {

    const {id} = useParams()

    const {collectionsDetail} = useContext(Context)
    const {bestsellers} = useContext(Context)
    const {search} = useContext(Context)
    const getData = useCallback(async () => {
        let response = await axios.get(`http://localhost:8000/collections/${id}/`)
        search.collection_name = response.data
        collectionsDetail.getProducts()
        bestsellers.getProducts()
        window.scrollTo(0, 0)
    }, [search, collectionsDetail, bestsellers, id])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Template path={[
            {page: 'Главная', path: '/'},
            {page: 'Коллекции', path: '/collections/'},
            {page: 'Лето 2022'},
        ]}>
            <div className={styles.wrap}>
                {search.collection_name ?
                    <h1 className={styles.title}>{search.collection_name.title}</h1>
                    :
                    null
                }
                <div className={styles.grid}>
                    {collectionsDetail.products.length ?
                        collectionsDetail.products.map((product) =>
                            <CardClothes product={product} key={product.id}/>
                        )
                        :
                        null
                    }
                </div>
                <div className={styles.pagination}>
                    {collectionsDetail.products.length ?
                        <Pagination store={collectionsDetail} />
                        :
                        null
                    }
                </div>
                <h1 className={styles.title}>Новинки</h1>
                <div className={styles.slider}>
                    <SliderProducts store={bestsellers}/>
                </div>
            </div>
        </Template>
    );
};

export default observer(CollectionDetail);