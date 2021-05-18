import Head from 'next/head'
import styles from '../styles/TransactionView.module.css'
import cn from 'classnames'
import { useState } from 'react'

/*
expects props with a transaction field which looks like this:
{
    date_reg: 1571219671.024,
    date_trans: 1571176800,
    amount: 175,
    desc: "Fysikbok",
    from_account: 101,
    to_account: 408
}
*/

export default function TransactionView(props) {

    const [editing, setEditing] = useState(false)

    const date = props.transaction.date_trans
    const amount = props.transaction.amount
    const from_account = props.transaction.from_account
    const to_account = props.transaction.to_account
    const desc = props.transaction.desc

    let div = <div className={styles.container}>      
                    <span className={cn(styles.item)}>
                        {date}
                    </span>
                    <span className={cn(styles.item)}>
                        {from_account} &rarr; {to_account}
                    </span>
                    <span className={cn(styles.item)}>
                        {amount} kr
                    </span>
                    <span className={cn(styles.item, styles.big)}>
                        {desc}
                    </span>
                    <span className={cn(styles.item, styles.medium)}>
                        <input type="button" value="Edit" onClick={(e) => {setEditing(true)}}/>
                        <input type="button" value="Delete" onClick={(e) => {}}/>
                    </span>
                </div>
    
    // TODO: Make account, amount and desc fields text
    // inputs when editing is true.
    if (editing) {
        div = <div className={styles.container}>      
                <span className={cn(styles.item)}>
                    {date}
                </span>
                <span className={cn(styles.item)}>
                    {from_account} &rarr; {to_account}
                </span>
                <span className={cn(styles.item)}>
                    {amount} kr
                </span>
                <span className={cn(styles.item, styles.big)}>
                    {desc}
                </span>
                <span className={cn(styles.item, styles.medium)}>
                    <input type="button" value="Save" onClick={(e) => {setEditing(false)}}/>
                </span>
            </div>
    }


    return div;
}