import styles from './shared.module.css'

type ModalProps = {
    isVisible: boolean,
    children: React.ReactNode
}

export default function Modal({ isVisible, children }: ModalProps) {
    return (
        <div className={styles.container} style={{ display: isVisible ? 'grid' : 'none', marginBottom: '0' }}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    )
}