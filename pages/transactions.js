import Head from 'next/head'
import styles from '../styles/Transactions.module.css'
import TransactionView from '../components/TransactionView'

export default function Transactions() {
    return (
        <div className={styles.container}>
            <Head>
				<title>danboard - Transactions</title>
			</Head>
            
            <main className={styles.main}>
                <h1>
                    All transactions
                </h1>
                <TransactionView transaction={{
                    date_reg: 1571219671.024,
                    date_trans: 1571176800,
                    amount: 175,
                    desc: "Fysikbok",
                    from_account: 101,
                    to_account: 408
                }}/>
                <TransactionView transaction={{
                    date_reg: 1571219671.024,
                    date_trans: 1571176800,
                    amount: 1750,
                    desc: "Fysikbok",
                    from_account: 101,
                    to_account: 408
                }}/>
            </main>
        </div>
    )
}