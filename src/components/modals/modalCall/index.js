//styles
import styles from './index.module.scss'
//icons
import UserIcon from "../../../assets/icons/UserIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";
import Phone3Icon from "../../../assets/icons/Phone3Icon";

const ModalCall = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.inner}>
                <CloseIcon className={styles.close}/>
                <h2>Если у Вас остались вопросы</h2>
                <span>Оставьте заявку и мы обязательно Вам перезвоним</span>
                <div className={styles.inputWrapper}>
                    <div><UserIcon/></div>
                    <input type="text" placeholder={"Как к вам обращаться?"}/>
                </div>
                <div className={styles.inputWrapper}>
                    <div><Phone3Icon/></div>
                    <input type="text" placeholder={"Номер телефона"}/>
                </div>
                <button className={styles.btn}>Заказать звонок</button>
            </div>
        </div>
    );
};

export default ModalCall;