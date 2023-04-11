import { useState } from 'react'
import Burger from './Burger'
import styles from './header.module.css'
import Menu from './Menu'

export default function Header() {
    const [menuVisible, setMenuVisible] = useState(false)

    function toggleMenu() {
        setMenuVisible(!menuVisible)
    }

    return (
        <header>
            <div className={styles.headerTop}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <img src="/avatar.png" alt="avatar" className={styles.avatar} />
                    <p style={{ fontFamily: 'Marck Script', fontSize: '1.5rem', color: 'var(--color-gold-primary)' }}>Welcome, <br />Courtney!</p>
                </div>
                <Burger toggleMenu={toggleMenu} />
            </div>
            <Menu menuVisible={menuVisible} toggleMenu={toggleMenu} />
        </header>
    )
}