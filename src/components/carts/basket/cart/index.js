import {useContext} from 'react';
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../../../../index";
//styles
import styles from './index.module.scss';
//icons and image
import img from "../../../../assets/images/Products/Rectangle 491-2.png";
import CloseIcon from "../../../../assets/icons/CloseIcon";
import MinusIcon from "../../../../assets/icons/MinusIcon";
import PlusIcon from "../../../../assets/icons/PlusIcon";

const CartBasket = ({product}) => {

    const {shoppingCart} = useContext(Context)

    const newPrice = product.price - (product.price * (product.discount / 100))

    return (
        <div className={styles.cart}>
            <div
                onClick={() => shoppingCart.delete(product)}
                className={styles.closeIcon}
            >
                <CloseIcon/>
            </div>
            <img src={img} alt=""/>
            <div className={styles.details}>
                <h4>{product.name}</h4>
                <div className={styles.size}>
                    <span>Размер: </span>
                    <span>{product.size}</span>
                </div>
                <div className={styles.colorWrapper}>
                    <span>Цвет:</span>
                    <div className={styles.color}>
                        <div className={styles.colorInner} style={{backgroundColor: product.product_color.rgb}}></div>
                    </div>
                </div>
                <div className={styles.price}>
                    <span className={styles.newPrice}>{newPrice}</span>
                    <span className={styles.oldPrice}>{product.price}</span>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button} onClick={()=> shoppingCart.decrement(product)}>
                        <MinusIcon/>
                    </div>
                    <span>
                        {product.countForBuy}
                    </span>
                    <div className={styles.button} onClick={()=> shoppingCart.increment(product)}>
                        <PlusIcon/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(CartBasket);