import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import rehypeRaw from "rehype-raw"
import SocialStats from "../shared/preview/SocialStats"
import TagsAndTopics from "../shared/preview/TagsAndTopics"
import Share from "../shared/preview/Share"
import styles from './looks.module.css'
import ColorBtn from "../shared/preview/ColorBtn"

type LookPreviewProps = {
    article: Look,
    togglePreview: () => void,
    colors: Color[]
}

export default function LookPreview({ article, togglePreview, colors }: LookPreviewProps) {
    const {
        title,
        description,
        draft,
        image1,
        image2,
        createdAt,
        updatedAt,
        tags,
        content
    } = article

    const date = () => {
        if (draft) return null
        const timestamp = updatedAt ? updatedAt.seconds : createdAt?.seconds
        const date = timestamp? new Date(timestamp * 1000).toLocaleDateString() : new Date().toLocaleDateString()
        return (
            <h5>
                <span>
                    {updatedAt ? 'Updated: ' : 'Posted: '}
                </span>
                {date}
            </h5>
        )
    }

    return (
        <div className="preview-container">

            <button onClick={togglePreview}>&times;</button>

            <div className="preview-content">

                <section className={styles.header}>

                    <div>

                        <h1>
                            {title}
                        </h1>

                        {date()}

                        {tags.length > 0 && <TagsAndTopics content={tags}>
                            Tags
                        </TagsAndTopics>}

                        <SocialStats />

                        <Share />

                    </div>

                    <div className={styles.img_container}>

                        <img src={image1} height={646} width={550} alt='' />
                            
                        <img src={image2} height={646} width={550} alt='' />

                    </div>

                    <h3>
                        {description}
                    </h3>

                    <div className={styles.color_div}>

                        {colors.map(color => (
                            <ColorBtn color={color} key={color.id} />
                        ))}

                    </div>

                </section>

                <section className={styles.content}>

                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                    >
                        {content}
                    </ReactMarkdown>

                    <SocialStats />

                    <aside className={styles.share}>

                        <p>
                            Share this article:
                        </p>

                        <Share />

                    </aside>

                </section>

            </div>

        </div>
    )
}