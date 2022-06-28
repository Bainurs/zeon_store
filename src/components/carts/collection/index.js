import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
//styles
import styles from "./index.module.scss"
//icons
import ArrowIcon from "../../../assets/icons/ArrowIcon";

const CartCollection = ({collection, ...props}) => {

    const navigate = useNavigate()

    const images = collection.collection_images
    const [currentImage, setCurrentImage] = useState(0)

    return (
        <div
            className={styles.cart}
            onClick={() => navigate(`/collections/${collection.id}`)}
        >
            <div className={styles.imagesWrap}>
                <div className={styles.images} style={{gridTemplateColumns: `repeat(${collection.collection_images.length}, 1fr)`}}>
                    {collection.collection_images.map((image, index) =>
                        <div onMouseOver={() => setCurrentImage(index)} key={image.id} className={styles.imageWrap}>
                            <div className={styles.indicator}></div>
                        </div>
                    )}
                </div>
                <img src={images[currentImage].image} className={styles.image} alt={images[currentImage].image}/>
            </div>
            <div className={styles.info}>
                <h4 className={styles.title}>Смотреть все</h4>
                <span className={styles.category}>{collection.title}</span>
                <ArrowIcon/>
            </div>
        </div>
    );
};

export default observer(CartCollection);