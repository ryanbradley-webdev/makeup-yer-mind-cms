import Facebook from './Facebook'
import LinkIcon from './LinkIcon'
import LinkedIn from './LinkedIn'
import Twitter from './Twitter'
import styles from './preview.module.css'

export default function Share() {
    return (
        <div className={styles.share_container}>
            
            <Facebook />

            <Twitter />

            <LinkedIn />

            <LinkIcon />

        </div>
    )
}