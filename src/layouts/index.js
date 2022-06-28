import {useContext, useState, useEffect, useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
//context store
import {Context} from "../index";
//styles
import styles from './index.module.scss'
//layouts
import Header from "./header";
import Footer from "./footer";
import HeaderMob from "./header/mobile";
import Loading from './../components/loading/index';

const Template = ({children, path}) => {

    const {search, novelties, bestsellers, productDetail} = useContext(Context)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    const loadData = useCallback(() => {
        if(novelties || bestsellers || productDetail) {
            setTimeout(() => {
                return setIsLoading(false)
            }, 2000)
        } else {
            return setIsLoading(false)
        }
        
    }, [novelties, bestsellers, productDetail])
    
    useEffect(() => {
        loadData()
    }, [loadData])

    return (
        <div
            className={styles.wrap}
            onClick={() => {
                search.setModalSearch(false)
            }}
        >
            {search.modalMobileBack ?
                <div className={styles.modalBack}></div>
                :
                null
            }

            {isLoading ?
                    <Loading />
                : 
                null
            }
            <>
                <Header/>
                <HeaderMob/>
                {path ?
                    <div className={styles.pathWrap}>
                        <div className={styles.inner}>
                        {path ?
                            <div className={styles.pathWrap}>
                                <div className={styles.inner}>
                                    {path.map((p, index, array) =>
                                        index !== array.length -1 ?
                                            <div key={index}>
                                                <span className={styles.breadcrumb} onClick={() => navigate(p.path)}>{p.page}</span>
                                                <span className={styles.breadcrumbLine}>/</span>
                                            </div>
                                            :
                                            <span key={index} className={styles.breadcrumbCurrent} onClick={() => navigate(p.path)}>{p.page}</span>
            
                                    )}
                                </div>
                            </div>
                            :
                            null
                        }
                        </div>
                    </div>
                    :
                    null
                }
                <div className='container'>
                    {children}
                </div>
            </>
            <Footer/>
        </div>
    );
};

export default observer(Template);