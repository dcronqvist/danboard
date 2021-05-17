import Head from 'next/head'
import styles from '../styles/Transactions.module.css'

export default function Transactions() {
    return (
        <div classNames={styles.container}>
            <Head>
				<title>danboard - Transactions</title>
			</Head>
            Hello Transactions
        </div>
    )
}