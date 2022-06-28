import {useContext, useState} from 'react';
//context store
import {Context} from "../../../../../index";
//styles
import styles from './index.module.scss'

const CardBasketInfoMobile = ({setOpen}) => {

    const {shoppingCart} = useContext(Context)

    const [isActive, setActive] = useState()

    return (
        <div className={styles.wrap}>
            {isActive ?
                <div className={styles.detail}>
                    <h4>Сумма заказа</h4>
                    <div className={styles.row}>
                    <span className={styles.subtitle}>
                        Общее количество:
                    </span>
                    <span className={styles.value}>
                        {shoppingCart.totalLines} линеек ({shoppingCart.totalProducts}шт.)
                    </span>
                    </div>
                    <div className={styles.row}>
                    <span className={styles.subtitle}>
                        Стоимость:
                    </span>
                        <span className={styles.value}>
                        {shoppingCart.totalSum} сом
                    </span>
                    </div>
                    <div className={styles.row}>
                    <span className={styles.subtitle}>
                        Скидка:
                    </span>
                        <span className={styles.value}>
                        {shoppingCart.totalDiscount} сом
                    </span>
                    </div>
                </div>
                :
                null
            }
            <div className={styles.sumWrap}>
                <span className={styles.sumTitle}>Итого к оплате:</span>
                <span className={styles.sum}>{shoppingCart.totalAmount} сом</span>
            </div>
            <button
                className={styles.btnInfo}
                onClick={() => setActive(bool => !bool)}
            >
                {isActive ? 'Скрыть' : 'Информация о заказе'}
            </button>
            <button
                className={styles.btn}
                onClick={() => setOpen(true)}
            >Оформить заказ</button>
        </div>
    );
};

export default CardBasketInfoMobile;