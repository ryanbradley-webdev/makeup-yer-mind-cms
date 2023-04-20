import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './header.module.css'

type ListItemProps = {
    children: ReactNode,
    path: string,
    closeMenu: () => void
}

export default function ListItem({ children, path, closeMenu }: ListItemProps) {
    return (
        <li className={styles.li} onClick={closeMenu}>
            
            <NavLink to={path} className={({ isActive }) => isActive ? styles.active : '' }>
                {children}
            </NavLink>
            
        </li>
    )
}