import ListItem from "./ListItem";
import styles from './header.module.css'

type MenuProps = {
    menuVisible: boolean,
    toggleMenu: () => void
}

export default function Menu({ menuVisible, toggleMenu }: MenuProps) {
    return (
        <div className={menuVisible ? styles.menu_visible : styles.menu}>
            
            <ul>
                
                <ListItem path="/" closeMenu={toggleMenu}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                    </svg>
                    
                    <p>Home</p>
                    
                </ListItem>
                
                <hr />
                
                <ListItem path="/blogs" closeMenu={toggleMenu}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z" />
                    </svg>
                    
                    <p>Blogs</p>
                    
                </ListItem>
                
                <hr />
                
                <ListItem path="/looks" closeMenu={toggleMenu}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M9,3L7.17,5H4A2,2 0 0,0 2,7V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V7A2,2 0 0,0 20,5H16.83L15,3M12,18A5,5 0 0,1 7,13A5,5 0 0,1 12,8A5,5 0 0,1 17,13A5,5 0 0,1 12,18M12,17L13.25,14.25L16,13L13.25,11.75L12,9L10.75,11.75L8,13L10.75,14.25" />
                    </svg>
                    
                    <p>Looks</p>
                    
                </ListItem>
                
                <hr />
                
                <ListItem path="/videos" closeMenu={toggleMenu}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
                    </svg>
                    
                    <p>Videos</p>
                    
                </ListItem>
                
                <hr />
                
                <ListItem path="/messages" closeMenu={toggleMenu}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18" />
                    </svg>
                    
                    <p>Messages</p>
                    
                </ListItem>
                
            </ul>
            
        </div>
    )
}