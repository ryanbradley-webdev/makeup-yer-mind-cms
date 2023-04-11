import styles from './header.module.css'

type BurgerProps = {
    toggleMenu: () => void
}

export default function Burger({ toggleMenu }: BurgerProps) {
    return (
        <button className={styles.burger} onClick={toggleMenu}>
            <div className={styles.burger_div}></div>
        </button>
    )
}