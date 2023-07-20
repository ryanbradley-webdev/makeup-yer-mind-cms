import { useState, useContext } from 'react'
import Burger from './Burger'
import styles from './header.module.css'
import Menu from './Menu'
import { getWindowWidth } from '../../util/functions'
import AuthContext from '../../contexts/AuthContext'

export default function Header() {
    const { user } = useContext(AuthContext)

    const [menuVisible, setMenuVisible] = useState(false)

    function toggleMenu() {
        if (getWindowWidth() < 1024) setMenuVisible(!menuVisible)
    }

    return (
        <header>

            <div className={styles.headerTop}>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>

                    <img
                        src="/avatar.png"
                        alt="avatar"
                        className={styles.avatar}
                    />

                    <p style={{ fontFamily: 'Marck Script', fontSize: '1.5rem', color: 'var(--color-gold-primary)' }}>
                        Welcome, <br />{(user && user.displayName) ? user.displayName.slice(0, user.displayName.indexOf(' ')) : 'Guest'}!
                    </p>

                </div>

                <Burger toggleMenu={toggleMenu} />

            </div>

            <Menu 
                menuVisible={menuVisible}
                toggleMenu={toggleMenu}
            />

        </header>
    )
}