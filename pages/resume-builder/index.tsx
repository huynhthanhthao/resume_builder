'use client';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { TopNavbar, Footer } from '@component';
import { One } from '@template';
import styles from './style.module.scss';
import { setData } from 'src/redux/core/actions';
import { getEmployee } from 'apis/employee';

const Home = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;

    useEffect(() => {
        const data = async () => {
            const response: any = await getEmployee(id);

            dispatch(setData(response));
        };
        data();
    }, []);

    return (
        <>
            <Head>
                <title>resume builder | wtfresume</title>
            </Head>
            <div style={{ fontFamily: props.theme.fontFamily }}>
                <div className={styles.loading} style={{ background: props.theme.color }}>
                    <div className={styles.loading_gradient}></div>
                </div>

                <TopNavbar itemStatus={props.itemStatus} theme={props.theme} userData={props.userData} id={router.query.id} />

                <div className={styles.container}>
                    <One id={router.query.id} />
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (store: any) => ({
    theme: store.theme,
    userData: store.userData,
    itemStatus: store.itemStatus,
});

export default connect(mapStateToProps)(Home);
