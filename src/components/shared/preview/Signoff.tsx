import { titleCase } from '../../../util/functions'
import styles from './preview.module.css'

export default function Signoff({
    author = 'courtney'
}: {
    author?: string
}) {
    return (
        <p className={styles.paragraph}>
            Love always,
            <br />
            <span className={styles.span}>{titleCase(author)}</span> xoxo
        </p>
    )
}