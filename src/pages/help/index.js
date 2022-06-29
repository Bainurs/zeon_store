import { useCallback, useContext, useEffect, useState } from 'react';
//context store
import {Context} from "../../index";
//containers
import Main from "../../layouts";
//componets
import QuestionsItem from "../../components/questions";
//styles
import styles from './index.module.scss';
//static images
import img from '../../assets/images/help/Rectangle 684.jpg'

const Help = () => {

    const {questions} = useContext(Context)

    const [isLoading, setLoading] = useState(true)

    const getData = useCallback(async () => {
      await questions.getQuestions()
      setLoading(false)
    },[questions, setLoading])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Main path={[
            {page: 'Главная', path: '/'},
            {page: 'Помощь'},
        ]}>
            <div className={styles.wrap}>
                <div className={styles.photo}>
                    <img src={img} alt=""/>
                </div>
                <div className={styles.info}>
                    <h1 className={styles.pageTitle}>Помощь</h1>
                    {!isLoading ?
                        questions.questions.map((question) =>
                            <QuestionsItem question={question} key={question.id}/>
                        )
                        :
                        null
                    }
                </div>
            </div>
        </Main>
    );
};

export default Help;