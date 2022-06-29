import React, {useState} from 'react';
import styles from './index.module.scss';
//icons
import UserIcon from '../../../assets/icons/UserIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Phone3Icon from '../../../assets/icons/Phone3Icon';
import * as Yup from "yup";
import {Formik} from "formik";

const ModalCall = ({isActive, setActive, setAccess}) => {

    const [status, setStatus] = useState(false)

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                setActive(false)
            }}
            className={styles.modal}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className={styles.inner}
            >
                <CloseIcon
                    onClick={(e) => {
                        setActive(false)
                    }}
                    className={styles.close}
                />
                <h2>Если у Вас остались вопросы</h2>
                <span>Оставьте заявку и мы обязательно Вам перезвоним</span>
                <Formik
                    initialValues={{ name: '', phone: ''}}
                    validationSchema={Yup.object({
                        name: Yup.string().required(),
                        phone: Yup.number().required(),
                    })}
                    onSubmit={(values) => {
                        setActive(false)
                        setAccess(true)
                        console.log(values)
                    }}
                >
                    {formik => (
                        <>
                        <div className={formik.touched.name && formik.errors.name ? `${styles.inputWrapper} ${styles.active}` : styles.inputWrapper}>
                            <div><UserIcon/></div>
                            <input
                                className={styles.input}
                                id="name"
                                type="text"
                                placeholder={"Как к вам обращаться?"}
                                {...formik.getFieldProps('name')}
                            />
                        </div>
                        <div className={formik.touched.phone && formik.errors.phone ? `${styles.inputWrapper} ${styles.active}` : styles.inputWrapper}>
                            <div><Phone3Icon/></div>
                            <input
                                onClick={() => setStatus(true)}
                                className={styles.input}
                                id="phone"
                                type="text"
                                placeholder={"Номер телефона?"}
                                {...formik.getFieldProps('phone')}
                            />
                        </div>
                            <button
                                type='button'
                                onClick={formik.handleSubmit}
                                className={
                                formik.isValid && status
                                    ?
                                `${styles.btn} ${styles.active}` : styles.btn}
                            >Заказать звонок</button>
                        </>
                    )}
                </Formik>


            </div>
        </div>
    );
};

export default ModalCall;