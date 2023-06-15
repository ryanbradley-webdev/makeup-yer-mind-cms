import styles from './preview.module.css'

export default function TagsAndTopics({
    content,
    children
}: {
    content: string[],
    children: string
}) {
    return (
        <p className={styles.content}>
            {children}: {content?.length > 0 && content.map((item, idx) => {
                let node = item
                if (idx !== content.length - 1) {
                    node += ', '
                }
                return node
            })}
        </p>
    )
}