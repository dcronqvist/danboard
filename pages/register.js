import Head from 'next/head'
import styles from '../styles/Register.module.css'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import cn from 'classnames'

export default function Register() {
    const [dot, setDot] = useState(new Date())

    return (
        <>
            <Head>
                <title>danboard - Register</title>
                <link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css" />
            </Head>

            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.head}>
                        <h1>Register transaction</h1>
                    </div>
                    <div className={styles.registration}>
                        <div className={styles.inputrow}>
                            <div className={styles.inputcontainer}>
                                <label>date of transaction</label>
                                <DatePicker className={cn(styles.inputfield, styles.medium)} selected={dot} onChange={(date) => setDot(date)}/>
                            </div>
                            <div className={styles.inputcontainer}>
                                <label>amount</label>
                                <input type="number" className={cn(styles.inputfield, styles.small)}/>
                            </div>      
                        </div>
                        <div className={styles.inputrow}>
                            <div className={styles.inputcontainer}>
                                <label>from account</label>
                                <select className={cn(styles.inputfield, styles.small)}>
                                    <option>1</option>
                                </select>
                            </div>
                            <p>&rarr;</p>
                            <div className={styles.inputcontainer}>
                                <label>to account</label>
                                <select className={cn(styles.inputfield, styles.small)}>
                                    <option>1</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.inputrow}>
                            <div className={styles.inputcontainer}>
                                <label>description</label>
                                <input type="text" className={cn(styles.inputfield, styles.big)}/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}