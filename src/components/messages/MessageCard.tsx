import { useNavigate } from 'react-router-dom'
import MessageIcon from '../../assets/MessageIcon'
import styles from './messages.module.css'

type MessageCardProps = {
    message: Message
}

export default function MessageCard({ message }: MessageCardProps) {
    const { name, content, read, id } = message

    const navigate = useNavigate()
    
    function truncateMessage(messageContent: string) {
        if (messageContent.length < 70) return messageContent
        let truncatedMessage = messageContent.slice(0, 70)
        const spaceIndex = truncatedMessage.lastIndexOf(' ')
        return truncatedMessage.substring(0, spaceIndex) + '...'
    }

    return (
        <div className={styles.card} onClick={() => navigate(`${id}`)}>
            <MessageIcon read={read} />
            <div className={styles.message}>
                <h5>{name}</h5>
                <p>{truncateMessage(content)}</p>
            </div>
        </div>
    )
}