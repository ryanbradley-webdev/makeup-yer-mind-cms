import styles from './preview.module.css'
import { titleCase } from '../../../util/functions'

export default function ColorBtn({
    color
}: {
    color: Color
}) {
  return (
    <a href={color.link} className={styles.color_btn}>
        
        <img src={color.image} height={76} width={134} alt='' />

        <div className={styles.color_info}>

            <p className={styles.color_name}>
                {color.name}
            </p>

            <p className={styles.color_brand}>
                {titleCase(color.brand)}
            </p>

        </div>

    </a>
  )
}