import styles from './index.module.scss'
import CallAccessIcon from "../../../assets/icons/CallAccessIcon";

const ModalCallAccess = ({setModal}) => {
    return (
        <div className={styles.modal} onClick={() => setModal(false)}>
            <div className={styles.inner}>
                <CallAccessIcon/>
                <h2>Спасибо!</h2>
                <span>Ваша заявка была принята ожидайте, скоро Вам перезвонят</span>
                <button className={styles.btn}>Продолжить покупки</button>
            </div>
        </div>
    );
};

export default ModalCallAccess;