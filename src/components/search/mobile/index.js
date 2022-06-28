import { useEffect, useState, useCallback } from 'react';
import {observer} from "mobx-react-lite";
//custom hook
import useSearch from "../../../hooks/useSearch";
//styles
import styles from './index.module.scss'
//icons
import SearchIcon from "../../../assets/icons/SearchIcon";

const SearchMobile = () => {

    const {search, navigate } = useSearch()
    const [height, setHeight] = useState(0)

    const handlePress = (e) => {
        if(e.key === 'Enter') {
            search.setModalMobile(false)
            search.setModalMobileBack(false)
            search.setModalSearch(false)
            navigate(`/search/?search=${ e.target.value}`)
        }
    }

    const resize = useCallback(async() => {
        setHeight(document.documentElement.scrollHeight)
    }, [])
    
    window.addEventListener("resize", resize);

    useEffect(() => {
        resize()
    },[resize])

    return (
        <div className={styles.wrap} style={{height: height - 100 + 'px'}}>
            <div
                tabIndex={0}
                className={styles.search}
            >
                <input
                    type="text"
                    placeholder='Поиск'
                    value={search.searchValue}
                    onChange={(e) => {
                        search.setSearchValue(e)
                        search.getProducts(e)
                    }}
                    onClick={()=>search.setModalSearch(true)}
                    onKeyPress={handlePress}
                />
                <div
                    className={styles.iconWrapper}
                    onClick={() => {
                        search.setModalMobile(false)
                        search.setModalMobileBack(false)
                        navigate(`/search/?search=${search.searchValue}`)
                    }}
                >
                    <SearchIcon/>
                </div>
                {
                search.products.length ?
                    <div className={styles.resultsWrap}>
                        <div className={styles.results}>
                            {search.products.map((product) =>
                                <div
                                    key={product.id}
                                    onClick={() => {
                                        search.clearSearchValue()
                                        search.clearProducts()
                                        search.setModalSearch(false)
                                        search.setModalMobileBack(false)
                                        search.setModalMobile(false)
                                        navigate(`/products/${product.id}`)
                                    }}
                                    className={styles.result}
                                >
                                    <h4>{product.name}</h4>
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default observer(SearchMobile);