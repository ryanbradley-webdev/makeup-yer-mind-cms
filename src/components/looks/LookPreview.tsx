import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import rehypeRaw from "rehype-raw"

type LookPreviewProps = {
    article: Look,
    togglePreview: () => void,
    colors: Color[]
}

export default function LookPreview({ article, togglePreview, colors }: LookPreviewProps) {
    const {
        title,
        description,
        image1,
        image2,
        tags,
        content
    } = article

    return (
        <div className="preview-container">
            <div className="preview-content">
                <button onClick={togglePreview}>&times;</button>
                <h1>{title}</h1>
                <img src={image1} alt="" />
                <img src={image2} alt="" />
                <h4>{description}</h4>
                <p>
                    Tags: {tags && tags.join(', ')}
                </p>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content || ''} />
            </div>
        </div>
    )
}