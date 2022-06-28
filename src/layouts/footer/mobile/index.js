import {useCallback, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
//styles
import styles from './index.module.scss';
//icons
import LogoFooterIcon from "../../../assets/icons/LogoFooterIcon";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import EmailIcon from "../../../assets/icons/EmailIcon";
import InstagramIcon from "../../../assets/icons/InstagramIcon";
import TelegramIcon from "../../../assets/icons/TelegramIcon";
import WhatsappIcon from "../../../assets/icons/WhatsappIcon";

const FooterMob = () => {

    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(true)

    const getData = useCallback(async () => {
        const response = await axios.get('http://localhost:8000/contacts/')
        setData(response.data[0])
        setLoading(false)
    }, [setData, setLoading]) 

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className={styles.footer}>
            <div className={styles.wrap}>
                <div className={styles.inner}>
                    <div className={styles.logo}>
                        <LogoFooterIcon/>
                    </div>
                    <div className={styles.infoWrap}>
                        <div className={styles.info}>
                            <h3>Компания</h3>
                            <Link to='/about-us'><span>О нас</span></Link>
                            <Link to='/news'><span>Новости</span></Link>
                            <Link to='/help'><span>Помощь</span></Link>
                        </div>
                        {!isLoading && data ?
                            <>
                                <div className={styles.info}>
                                    <h3>Контакты</h3>
                                    <div>
                                    <PhoneIcon/>
                                        <a href={`tel:${data.phone1}`}><span>{data.phone1}</span></a>
                                    </div>
                                    <div>
                                        <PhoneIcon/>
                                        <a href={`tel:${data.phone2}`}><span>{data.phone2}</span></a>
                                    </div>
                                    <div>
                                        <EmailIcon/>
                                        <span>{data.email}</span>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <h3>Мы в социальных сетях</h3>
                                    <div>
                                        <InstagramIcon/>
                                        <a href={data.instagram} target="_blank" rel="noreferrer">Instagram</a>
                                    </div>
                                    <div>
                                        <TelegramIcon/>
                                        <a href={data.telegram} target="_blank" rel="noreferrer">Telegram</a>
                                    </div>
                                    <div>
                                        <WhatsappIcon/>
                                        <a href={data.whatsapp} target="_blank" rel="noreferrer">Whatsapp</a>
                                    </div>
                                </div>
                            </>
                            :
                            null
                        }
                        <p className={styles.dev}>Developed by Zeon 2022</p>
                    </div>
                </div>
            </div>
            <div className={styles.separator}></div>
        </div>
    );
};

export default FooterMob;