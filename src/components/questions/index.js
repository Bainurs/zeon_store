import {useState} from 'react';
//styles
import styles from "./index.module.scss"
import ArrowBottomIcon from "../../assets/icons/ArrowBottomIcon";

const QuestionsItem = ({question}) => {

    const [isOpen, setOpen] = useState(false)

    return (
        <div
            onClick={() => setOpen(bool => !bool)}
            className={styles.question}
        >
            <div className={styles.titleWrap}>
                <h3 className={styles.title}>{question.title}</h3>
                <ArrowBottomIcon className={isOpen ? `${styles.arrow} ${styles.active}` : styles.arrow}/>
            </div>
            <span
                className={isOpen ? `${styles.text} ${styles.active}` : styles.text}
            >
                {question.description}
            </span>
        </div>
    );
};

export default QuestionsItem;