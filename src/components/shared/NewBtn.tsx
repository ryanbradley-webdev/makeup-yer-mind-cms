import { ReactNode } from 'react'
import styles from './shared.module.css'

type NewBtnProps = {
    children: ReactNode,
    handleClick: () => void
}

export default function NewBtn({ children, handleClick }: NewBtnProps) {
    return (
        <button onClick={handleClick} type='button' className={styles.newBtn}>
            {children}
        </button>
    )
}