import {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {Formik} from "formik";
import * as Yup from 'yup'
import {toJS} from "mobx";
//context store
import {Context} from "../../../index";
//styles
import styles from './index.module.scss';
//icons
import CloseIcon from "../../../assets/icons/CloseIcon";
import Kyrgyzstan from "../../../assets/icons/countryFlag/Kyrgyzstan";
import Japan from "../../../assets/icons/countryFlag/Japan";
import Belgium from "../../../assets/icons/countryFlag/Belgium";

const BasketModal = ({isOpen, accessModal, setOpen}) => {

    const {shoppingCart} = useContext(Context)

    const [status, setStatus] = useState(false)

    const [numbers, setNumbers] = useState([
        {flag: <Kyrgyzstan/>, code: '+996'},
        {flag: <Japan/>, code: '+81'},
        {flag: <Belgium/>, code: '+32'},
    ])
    const [currentNumber, setCurNumber] = useState(0)
    const [isNumberOpen, setNumberOpen] = useState(false)
    
    const handleOrder = () => {
        shoppingCart.deleteAll();
    }

    return (
        <div className={styles.modal} onClick={(e) => {
            setOpen(false)
        }}>
            <div className={styles.wrap}>
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        // setNumberOpen(true)
                    }}
                    className={styles.inner}
                >
                    <h1>Оформление заказа</h1>
                    <div className={styles.close}>
                        <CloseIcon
                            onClick={(e) => {
                                setOpen(false)
                            }}
                        />
                    </div>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', email: '', phone: '', country: '', city: '', offer: false }}
                        validationSchema={Yup.object({
                            firstName: Yup.string().required(),
                            lastName: Yup.string().required(),
                            email: Yup.string().email().required(),
                            phone: Yup.number().required(),
                            country: Yup.string().required(),
                            city: Yup.string().required(),
                            offer: Yup.bool().oneOf([true]).required(),
                        })}
                        onSubmit={(values) => {
                            values.products = toJS(shoppingCart.products)
                            setOpen(false)
                            accessModal(true)
                            handleOrder()
                            console.log(values)
                        }}
                    >
                        {formik => (
                            <>
                                <span
                                    className={formik.touched.firstName && formik.errors.firstName ? `${styles.subtitle} ${styles.active}` : styles.subtitle}
                                >
                                    Ваше имя
                                </span>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder='Например Нурсултан'
                                    className={formik.touched.firstName && formik.errors.firstName ? `${styles.input} ${styles.active}` : styles.input}
                                    {...formik.getFieldProps('firstName')}
                                />

                                <span
                                    className={formik.touched.lastName && formik.errors.lastName ? `${styles.subtitle} ${styles.active}` : styles.subtitle}
                                >
                                    Ваша фамилия
                                </span>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder='Например Нурсултанов'
                                    className={formik.touched.lastName && formik.errors.lastName ? `${styles.input} ${styles.active}` : styles.input}
                                    {...formik.getFieldProps('lastName')}
                                />

                                <span
                                    className={formik.touched.email && formik.errors.email ? `${styles.subtitle} ${styles.active}` : styles.subtitle}
                                >
                                    Электронная почта
                                </span>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder='nursultan228@mail.com'
                                    className={formik.touched.email && formik.errors.email ? `${styles.input} ${styles.active}` : styles.input}
                                    {...formik.getFieldProps('email')}
                                />

                                <span
                                    className={formik.touched.phone && formik.errors.phone ? `${styles.subtitle} ${styles.active}` : styles.subtitle}
                                >
                                    Ваш номер телефона
                                </span>
                                <div className={formik.touched.phone && formik.errors.phone ? `${styles.numberWrap} ${styles.active}` : styles.numberWrap}>
                                    <div className={styles.number}>
                                        <div
                                            onClick={() => setNumberOpen(bool => !bool)}
                                            className={styles.numberSelected}
                                        >
                                            {numbers[currentNumber].flag}
                                            {numbers[currentNumber].code}
                                            <div className={styles.triangle}></div>
                                        </div>
                                        {isNumberOpen ?
                                            <div className={styles.numbers}>
                                                {numbers.map((number, index) =>
                                                    <div onClick={() => {
                                                        setNumberOpen(false)
                                                        setCurNumber(index)
                                                    }}
                                                        key={index}
                                                        className={styles.numberItem}
                                                    >
                                                        {number.flag} {number.code}
                                                    </div>
                                                )}
                                            </div>
                                            :
                                            null
                                        }

                                    </div>
                                    <input
                                        id="phone"
                                        type="text"
                                        placeholder='Введите номер телефона'
                                        className={styles.input}
                                        {...formik.getFieldProps('phone')}
                                    />
                                </div>
                                <span
                                    className={formik.touched.country && formik.errors.country ? `${styles.subtitle} ${styles.active}` : styles.subtitle}
                                >
                                    Страна
                                </span>
                                <input
                                    id="country"
                                    type="text"
                                    placeholder='Введите страну'
                                    className={formik.touched.country && formik.errors.country ? `${styles.input} ${styles.active}` : styles.input}
                                    {...formik.getFieldProps('country')}
                                />

                                <span
                                    className={formik.touched.city && formik.errors.city ? `${styles.subtitle} ${styles.active}` : styles.subtitle}
                                >
                                    Город
                                </span>
                                <input
                                    id="city"
                                    type="text"
                                    placeholder='Введите город'
                                    className={formik.touched.city && formik.errors.city ? `${styles.input} ${styles.active}` : styles.input}
                                    {...formik.getFieldProps('city')}
                                />

                                <div className={styles.offerWrap}>
                                    <input
                                        id="offer"
                                        type="checkbox"
                                        placeholder='Введите город'
                                        onClick={() => setStatus(true)}
                                        {...formik.getFieldProps('offer')}
                                    />
                                    <span>Согласен с условиями <Link to="/offer" target={"_blank"}>публичной оферты</Link></span>
                                </div>
                                <button
                                    type='button'
                                    onClick={formik.handleSubmit}
                                    className={
                                        formik.isValid && status
                                        ?
                                        `${styles.btn} ${styles.active}` : styles.btn
                                    }
                                >
                                    Заказать
                                </button>
                            </>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default BasketModal;
