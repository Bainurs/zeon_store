//styles
import styles from './index.module.scss'
//icons
import MoneyIcon from "../../assets/icons/MoneyIcon";
import TruckIcon from "../../assets/icons/TruckIcon";
import CallbackIcon from "../../assets/icons/CallbackIcon";
import ShopIcon from "../../assets/icons/ShopIcon";

const Benefits = () => {
    return (
        <div className={styles.inner}>
            <h3 className={styles.title}>Наши преимущества</h3>
            <div className={styles.benefits}>
                <div className={styles.benefit}>
                    <MoneyIcon/>
                    <h4>Удобные способы оплаты</h4>
                    <p>Мы предлагаем возможность безналичной оплаты</p>
                </div>
                <div className={styles.benefit}>
                    <TruckIcon/>
                    <h4>Своевременная доставка</h4>
                    <p>100% гарантия возврата товара - 14 дней на возврат, без скандалов и истерик.</p>
                </div>
                <div className={styles.benefit}>
                    <CallbackIcon/>
                    <h4>Профессиональная консультация</h4>
                    <p>Мы проконсультируем
                        и индивидуально подойдем
                        к Вашему заказу </p>
                </div>
                <div className={styles.benefit}>
                    <ShopIcon/>
                    <h4>Акции и бонусы для покупателей</h4>
                    <p>Промокоды со скидками для постоянных клиентов, акции
                        на новые позиции</p>
                </div>
            </div>
        </div>
    );
};

export default Benefits;