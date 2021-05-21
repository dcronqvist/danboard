import Head from 'next/head'
import styles from '../styles/Transactions.module.css'
import TransactionView from '../components/TransactionView'
import { useState } from 'react';
import DatePicker from 'react-datepicker'
const axios = require('axios').default;

const token = "c52b6ef7-d65a-4b90-a1b9-8e0222848621"

export default function Transactions() {
    const [transactions, setTransactions] = useState([])
    const [accounts, setAccounts] = useState({})
    const [filterMode, setFilterMode] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

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
                <div className={styles.head}>
                    <h1>
                        All transactions
                    </h1>

                    { filterMode == "customRange" ? 
                        <>
                            <DatePicker isClearable placeholderText="Starting date" selected={startDate} onChange={(date) => setStartDate(date)}/>
                        </>
                        :
                        <>

                        </>
                    }

                    <select value={filterMode} name="filterMode" id="filterMode" onChange={(e) => setFilterMode(e.target.value)}>
                        <option value="currentMonth">current month</option>
                        <option value="customRange">custom range</option>
                    </select>
                </div>  
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