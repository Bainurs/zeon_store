import {useContext} from 'react';
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../../../../index";
//styles
import styles from "./index.module.scss";

const CardBasketInfo = ({setOpen}) => {

    const {shoppingCart} = useContext(Context)

    return (
        <div className={styles.info}>
            <div className={styles.infoInner}>
                <h4 className={styles.title}>Сумма заказа</h4>
                <div className={styles.infoRow}>
                    <span className={styles.subtitle}>Количество линеек:</span>
                    <span className={styles.count}>{shoppingCart.totalLines} шт</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.subtitle}>Количество товаров:</span>
                    <span className={styles.count}>{shoppingCart.totalProducts} шт</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.subtitle}>Стоимость:</span>
                    <span className={styles.count}>{shoppingCart.totalSum} сом</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.subtitle}>Скидка:</span>
                    <span className={styles.count}>{shoppingCart.totalDiscount} сом</span>
                </div>
                <div className={styles.separator}></div>
                <div className={styles.infoRow}>
                    <span className={styles.subtitle}>Итого к оплате:</span>
                    <span className={styles.count}>{shoppingCart.totalAmount} сом</span>
                </div>
                <button
                    className={styles.btn}
                    onClick={() => setOpen(true)}
                >Оформить заказ</button>
            </div>
        </div>
    );
};

export default observer(CardBasketInfo);