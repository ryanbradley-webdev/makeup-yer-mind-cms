import styles from './shared.module.css'

export default function YouTube({
    url
}: {
    url: string
}) {
    const youtubeURL = () => {
        if (url.includes('youtu.be')) {
            const id = url.replace('https://youtu.be/', '')

            return `https://www.youtube.com/embed/${id}`
        }

        return url
    }

    return (
        <iframe
            src={youtubeURL()}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className={styles.youtube}
        />
    )
}