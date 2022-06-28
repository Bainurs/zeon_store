import {observer} from "mobx-react-lite";
//custom hook
import useSearch from "../../../hooks/useSearch";
//styles
import styles from './index.module.scss';
//icons
import SearchIcon from "../../../assets/icons/SearchIcon";

const SearchDesktop = () => {

    const {search, navigate, handlePress } = useSearch()

    return (
        <div
            className={styles.searchWrap}
            onClick={(e) => e.stopPropagation()}
        >
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
                        search.getProducts()
                    }}
                    onClick={()=>search.setModalSearch(true)}
                    onKeyPress={handlePress}
                />
                <div
                    className={styles.iconWrapper}
                    onClick={() => {
                        navigate(`/search/?search=${search.searchValue}`)
                    }}
                >
                    <SearchIcon/>
                </div>
            </div>
            {search.modalSearch ?
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
                :
                null
            }
        </div>
    );
};

export default observer(SearchDesktop);