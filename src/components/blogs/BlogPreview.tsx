import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import rehypeRaw from "rehype-raw"

type BlogPreviewProps = {
    article: Partial<Blog>,
    togglePreview: () => void
}

export default function BlogPreview({ article, togglePreview }: BlogPreviewProps) {
    const {
        title,
        description,
        image,
        topics,
        content
    } = article

    return (
        <div className="preview-container">
            <div className="preview-content">
                <button onClick={togglePreview}>&times;</button>
                <h1>{title}</h1>
                <img src={image} alt="" />
                <h4>{description}</h4>
                <p>
                    Topics: {topics && topics.join(', ')}
                </p>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content || ''} />
            </div>
        </div>
    )
}