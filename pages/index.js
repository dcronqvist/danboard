import Head from 'next/head'
import styles from '../styles/Home.module.css'
import cn from 'classnames'
import LinkCard from '../components/LinkCard'
import Link from 'next/link'

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>danboard</title>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					danboard
				</h1>
				<h2 className={styles.subtitle}>
					a place for all things daniel
				</h2>

				<div className={styles.grid}>
					<LinkCard href='/transactions' linkText="Transactions" text="View and manage all transactions."/>
					<LinkCard href='/budgets' linkText="Budgets" text="View and manage all account budgets."/>
					<LinkCard href='/register' linkText="Register" text="Register new expenses or incomes."/>
					<LinkCard href='/statistics' linkText="Statistics" text="View pretty graphs of dat money."/>
				</div>		
			</main>
		</div>
	)
}
