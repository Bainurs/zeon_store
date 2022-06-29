import {useContext, useEffect, useCallback} from 'react';
import { useSearchParams } from "react-router-dom";
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../../index";
//containers
import Main from "../../layouts/index";
//components
import CardClothes from "../../components/carts/clothes";
import SliderProducts from "../../components/sliders/products/index";
import Pagination from "../../components/pagination/index";
//styles
import styles from './index.module.scss';

const SearchResult = () => {

    const {search} = useContext(Context)
    const {bestsellers} = useContext(Context)

    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("search"))

    const getData = useCallback(async () => {
        await bestsellers.getProducts()
    }, [bestsellers])

    useEffect(() => {
        getData()
    }, [getData])


    return (
        <Main path={[
            {page: 'Главная', path: '/'},
            {page: 'Результаты поиска'},
        ]}>
            <h1 className={styles.title}>Результаты поиска по запросу: {search.search_page_value}</h1>
            <div className={styles.grid}>
                {search.search_page_products.length !== 0 ?
                    search.search_page_products.map((product)=>
                        <CardClothes product={product} key={product.id}/>
                    )
                    :
                    null
                }
            </div>
            {search.search_page_products.length !== 0 ?
                <Pagination store={search}/>
                :
                null
            }
            {search.search_page_products.length === 0?
                <>
                {search.search_page_value.length !== 0 ?
                    <div className={styles.notFound}>По вашему запросу ничего не найдено</div>
                    :
                    <h1 className={styles.notFound}>Введите запрос</h1>
                }
                    <h1 className={styles.extra}>Возможно вас заинтересует</h1>
                    <div className={styles.slider}>
                        {bestsellers.products.length ?
                            <SliderProducts store={bestsellers}/>
                            :
                            null
                        }
                    </div>
                </>
                :
                null
            }
        </Main>
    );
};

export default observer(SearchResult);