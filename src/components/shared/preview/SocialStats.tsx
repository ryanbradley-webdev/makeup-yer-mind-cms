import EyeIcon from '../../../assets/EyeIcon'
import HeartIcon from '../../../assets/HeartIcon'
import styles from './preview.module.css'

export default function SocialStats() {
    return (
        <div className={styles.social_stats}>
            
            <div className={styles.stat_div}>

                <EyeIcon />

                <span>
                    0
                </span>

            </div>

            <div className={styles.stat_div}>

                <HeartIcon />

                <span>
                    0
                </span>

            </div>

        </div>
    )
}