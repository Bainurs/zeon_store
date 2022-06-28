import {useCallback, useContext, useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../../index";
//containers
import Template from "../../layouts";
//components
import NewsItem from "../../components/newsItem";
//styles
import styles from './index.module.scss'

const News = () => {

    const {news} = useContext(Context)
    const lastElem = useRef()
    const observer = useRef()

    const getData = useCallback(async () => {
        await news.getNews()
        
        let callback = (entries) => {
            if (entries[0].isIntersecting) {
                news.getNextNews()
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElem.current)
    }, [news, observer])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Template path={[
            {page: 'Главная', path: '/'},
            {page: 'Новости'},
        ]}>
            <h1 className={styles.pagetitle}>Новости</h1>
            <div className={styles.wrap}>
                {news.news.length ?
                    news.news.map((news) =>
                        <NewsItem news={news} key={news.id}/>
                    )
                    :
                    null
                }
            </div>
            <div ref={lastElem}></div>
        </Template>
    );
};

export default observer(News);