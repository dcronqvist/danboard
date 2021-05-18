import Head from 'next/head'
import styles from '../styles/Transactions.module.css'
import TransactionView from '../components/TransactionView'
import { useState } from 'react';
const axios = require('axios').default;

const token = "x"

export default function Transactions() {
    const [transactions, setTransactions] = useState([])
    const [accounts, setAccounts] = useState({})

    axios.get("https://devapi.dcronqvist.se/v1/economy/periods/months?token=" + token + "&username=dani&year=2020&month=5").then(response => {   
        const startDate = response.data.response[0].start_timestamp
        const endDate = response.data.response[0].end_timestamp

        axios.get('https://devapi.dcronqvist.se/v1/economy/transactions?token=' + token + '&username=dani&startDate=' + startDate + '&endDate=' + endDate).then(response => {
            setTransactions(response.data.response)
        }) 
    }).catch((error) => {
        if(error.response) {
            console.log(error.response.data)
        }
    })

    return (
        <div className={styles.container}>
            <Head>
				<title>danboard - Transactions</title>
			</Head>
            
            <main className={styles.main}>
                <h1>
                    All transactions
                </h1>
                <div className={styles.list}>
                    {   
                        transactions.map(trans => {
                            return <TransactionView key={trans._id} transaction={trans}/>
                        })
                    }   
                </div>             
            </main>
        </div>
    )
}