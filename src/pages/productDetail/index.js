import {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../../index";
//containers
import Main from "../../layouts/index";
//components
import SliderImages from "../../components/sliders/images";
import SliderProducts from "../../components/sliders/products";
//styles
import styles from './index.module.scss';
//icons
import LoveFillIcon from "../../assets/icons/LoveFillIcon";
// import ProductCartIcon from "../../assets/icons/ProductCartIcon";
import LoveIcon from "../../assets/icons/LoveIcon";


const Product = () => {

    const navigate = useNavigate()

    const {productDetail} = useContext(Context)
    const {shoppingCart} = useContext(Context)
    const {favorites} = useContext(Context)
    const {bestsellers} = useContext(Context)

    const {id} = useParams()

    const [isLoading, setLoading] = useState(true)
    const [isColorInBasket, setColor] = useState(shoppingCart.products.find((item)=>item.id === productDetail.product.id && item.product_color.id === productDetail.product.product_color.id))

    const [isFavorite, setFavorite] = useState(false)
    const [newPrice, setPrice] = useState(0)

    const getData = useCallback(async () => {
        await productDetail.getProduct(id)
        setPrice(productDetail.product.price - (productDetail.product.price * (productDetail.product.discount / 100)))
        setColor(shoppingCart.products.find((item)=>item.id === productDetail.product.id && item.product_color.id === productDetail.product.product_color.id))
        setFavorite(Boolean(favorites.products.find((item) => item.id === productDetail.product.id)))
        setLoading(false)
        await bestsellers.getProducts()
    }, [productDetail, bestsellers, shoppingCart, favorites, id])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Main path={[
            {page: 'Главная', path: '/'},
            {page: 'Коллекции', path: '/collections/'},
            {page: isLoading ? null : productDetail.product.collection_name,
                path: `/collections/${isLoading ? null : productDetail.product.collection}/`},
            {page: 'Вечернее платье'},
        ]}>
            <div className={styles.wrap}>
                <div className={styles.sliderImages}>
                    {!isLoading ?
                        <SliderImages store={productDetail}/>
                        :
                        null
                    }
                </div>
                <div className={styles.images}>
                    {!isLoading ?
                        productDetail.product.product_colors.map((color) =>
                            <div key={color.id}>
                                <img src={color.image} alt=""/>
                            </div>
                        )
                        :
                        null
                    }
                </div>
                <div className={styles.info}>
                    <div className={styles.innerInfo}>
                        <h1 className={styles.productTitle}>Вечернее платье</h1>
                        <div className={styles.article}>
                            <span className={styles.subTitle}>Артикул: </span>
                            <span className={styles.text}>Платье PL984/dakota</span>
                        </div>
                        <div className={styles.colorContainer}>
                            <span className={styles.subTitle}>Цвет: </span>
                            <div className={styles.colors}>
                                {!isLoading ?
                                    productDetail.product.product_colors.map((color) =>
                                        productDetail.product.product_color.id === color.id ?
                                            <div className={`${styles.colorWrap} ${styles.active}`} key={color.id}>
                                                <div className={styles.color} style={{backgroundColor: color.rgb}}></div>
                                            </div>
                                            :
                                            <div
                                                onClick={() => {
                                                    productDetail.setColor(color)
                                                    setColor(shoppingCart.products.find((item)=>item.id === productDetail.product.id && item.product_color.id === productDetail.product.product_color.id))
                                                }}
                                                className={styles.colorWrap}
                                                key={color.id}
                                            >
                                                <div className={styles.color} style={{backgroundColor: color.rgb}}></div>
                                            </div>
                                    )
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className={styles.sumWrap}>
                            <span className={styles.sum}>{newPrice} с </span>
                            <span className={styles.sumOld}>{productDetail.product.price} с</span>
                        </div>
                        <h3 className={styles.subTitle}>О товаре</h3>
                        <span className={styles.content}>За последние 35 лет бренд Bonucci из обычного производителя одежды превратился в широко узнаваемую марку, а его продукция – в синоним высокого качества и актуального стиля.  </span>
                        <div className={styles.extra}>
                            <div>
                                <span className={styles.subTitle}>Размерный ряд: </span>
                                <span>42-50</span>
                            </div>
                            <div>
                                <span className={styles.subTitle}>Состав ткани: </span>
                                <span>Полиэстер</span>
                            </div>
                            <div>
                                <span className={styles.subTitle}>Количество в линейке: </span>
                                <span>5</span>
                            </div>
                            <div>
                                <span className={styles.subTitle}>Материал: </span>
                                <span>Полиэстер</span>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            {isColorInBasket
                                ?
                                <button
                                    className={styles.addCart}
                                    onClick={() => {
                                        navigate('/cart/')
                                    }}
                                >
                                    Перейти в корзину
                                </button>
                                :
                                <button
                                    className={styles.addCart}
                                    onClick={() => {
                                        shoppingCart.add(productDetail.getProductForBasket())
                                        setColor(shoppingCart.products.find((item)=>item.id === productDetail.product.id && item.product_color.id === productDetail.product.product_color.id))
                                    }}
                                >
                                    Добавить в корзину
                                </button>
                            }
                            <button className={styles.addFavorite}>
                                {isFavorite ?
                                    <LoveFillIcon
                                        onClick={() => {
                                            favorites.delete(productDetail.product)
                                            setFavorite(false)
                                        }}
                                        style={{fill: '#fff'}}
                                    />
                                    :
                                    <LoveIcon

                                        onClick={() => {
                                            favorites.add(productDetail.product)
                                            setFavorite(true)
                                        }}
                                        style={{fill: '#fff'}}
                                    />
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className={styles.title}>Похожие товары</h1>
            <div className={styles.slider}>
                <SliderProducts store={bestsellers}/>
            </div>
        </Main>
    );
};

export default observer(Product)