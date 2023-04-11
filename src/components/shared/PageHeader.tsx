import { ReactNode } from 'react'
import styles from './shared.module.css'

type PageHeaderProps = {
    children: ReactNode
}

export default function PageHeader({ children }: PageHeaderProps) {
    return (
        <div className={styles.pageHeader}>
            {children}
        </div>
    )
}