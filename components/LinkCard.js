import Link from 'next/link'
import styles from '../styles/LinkCard.module.css'

export default function LinkCard(props) {
    return (
        <Link href={props.href} >
            <a className={styles.card}>
                <p className={styles.link}>
                    {props.linkText} &rarr; 
                </p>
                <p className={styles.text}>
                    {props.text}
                </p>
            </a>
        </Link>
    )
}