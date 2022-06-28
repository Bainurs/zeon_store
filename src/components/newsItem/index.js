import {useState} from 'react';
import {observer} from "mobx-react-lite";
import styles from "./index.module.scss";

const NewsItem = ({news}) => {

    const [isOpen, setOpen] = useState(false)

    return (
        <div className={styles.news}>
            <img src={news.image} alt=""/>
            <div className={styles.content}>
                <div
                    className={isOpen ? `${styles.info} ${styles.active}` : styles.info}
                >
                    <h3 className={styles.title}>{news.title}</h3>
                    <span className={styles.desc}>{news.description}</span>
                </div>
                <button
                    onClick={() => {
                        setOpen(bool => !bool)
                    }}
                    className={styles.btn}
                >
                    {isOpen ? 'Скрыть' : 'Читать полностью'}</button>
            </div>
        </div>
    );
};

export default observer(NewsItem);