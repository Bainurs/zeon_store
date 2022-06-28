import {observer} from "mobx-react-lite";
//styles
import styles from './index.module.scss'
//icons
import LeftIcon from "../../assets/icons/LeftIcon";
import RightIcon from "../../assets/icons/RightIcon";

const Pagination = ({store}) => {

    return (
        <div className={styles.wrap}>
            <div className={styles.pagination}>
                <div
                    onClick={() => {
                        
                        store.getPrev()
                    }}
                    className={`${styles.button} ${styles.prev}`}
                >
                    <LeftIcon/>
                </div>
                {store.pagesArray.map((page, index) =>
                    store.current_page === page ?
                        <div key={index} className={`${styles.button} ${styles.active}`}>{page}</div>
                        :
                    page === '...' ?
                        <div key={index}
                            className={styles.button}
                        >
                            {page}
                        </div>
                        :
                        <div
                            key={index}
                            className={styles.button}
                            onClick={() => store.setPage(page)}
                        >
                            {page}
                        </div>
                )}
                {/*<div className={styles.button}>...</div>*/}
                {/*<div className={styles.button}>{store.pages_quantity}</div>*/}
                <div
                    className={`${styles.button} ${styles.next}`}
                    onClick={() => store.getNext()}
                >
                    <RightIcon/>
                </div>
            </div>
        </div>
    );
};

export default observer(Pagination);