import {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
//context store
import {Context} from "../../../index";
//styles
import styles from "./index.module.scss";
//icons
import LoveIcon from "../../../assets/icons/LoveIcon";
import LoveFillIcon from "../../../assets/icons/LoveFillIcon";

const CardClothes = ({product, ...props}) => {

    const {favorites} = useContext(Context)
    const initValue = Boolean(favorites.products.find((item) => item.id === product.id))
    const [isFavorite, setFavorite] = useState(initValue)
    const navigate = useNavigate()
    const [images, setImages] = useState(product.product_colors)
    const [currentImage, setCurrentImage] = useState(0)



    return (
        <div
            className={styles.cart}
            onClick={() => navigate(`/products/${product.id}`)}
            onMouseOut={() => setCurrentImage(0)}
        >
            <div className={styles.imagesWrap}>
                <div className={styles.images} style={{gridTemplateColumns: `repeat(${product.product_colors.length}, 1fr)`}}>
                    {product.product_colors.map((color, index) =>
                        <div 
                            onMouseOver={() => {
                                setCurrentImage(index)
                            }} 
                            key={color.id} 
                            className={styles.imageWrap}
                        >
                            <div className={styles.indicator}></div>
                        </div>
                    )}
                </div>
                <img 
                    src={images[currentImage].image} 
                    className={styles.image} 
                    alt={images[currentImage].image}
                />
            </div>

            {product.discount !== 0 ?
                (
                    <div className={styles.triangle}>
                        <span className={styles.sale}>{product.discount}%</span>
                    </div>
                ) : null

            }
            {isFavorite ?
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        favorites.delete(product)
                        setFavorite(false)
                    }}
                    className={styles.icon}
                >
                    <LoveFillIcon/>
                </div>
                :
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        favorites.add(product)
                        setFavorite(true)
                    }}
                    className={styles.icon}
                >
                    <LoveIcon
                        className={styles.loveIcon}
                    />
                </div>
            }
            <div className={styles.info}>
                <h4 className={styles.title}>{product.name}</h4>
                <span className={styles.sum}>{product.price} сом</span>
                <div className={styles.sizes}>
                    <span className={styles.size}>Размер:</span>
                    <span className={styles.sizeNumber}>{product.size}</span>
                </div>
                <div className={styles.colors}>
                    {product.product_colors.map((color) =>
                        <div className={styles.color} key={color.id} style={{backgroundColor: color.rgb}}></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardClothes;