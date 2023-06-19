import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import rehypeRaw from "rehype-raw"
import styles from './blogs.module.css'
import Share from "../shared/preview/Share"
import SocialStats from "../shared/preview/SocialStats"
import TagsAndTopics from "../shared/preview/TagsAndTopics"
import Signoff from "../shared/preview/Signoff"

type BlogPreviewProps = {
    article: Partial<Blog>,
    togglePreview: () => void
}

export default function BlogPreview({ article, togglePreview }: BlogPreviewProps) {
    const {
        title,
        description,
        createdAt,
        updatedAt,
        draft,
        image,
        topics,
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

                        {
                            (topics && topics.length > 0) &&

                            <TagsAndTopics content={topics}>
                                Topics
                            </TagsAndTopics>
                        }

                        <SocialStats />

                        <Share />
                        
                    </div>

                    <img src={image} height={337} width={448} alt='' />

                    <h3>{description}</h3>

                </section>

                <section className={styles.content}>

                    <ReactMarkdown 
                        rehypePlugins={[rehypeRaw]}
                    >
                        {content || ''}
                    </ReactMarkdown>

                    <Signoff />

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