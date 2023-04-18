import { useNavigate } from 'react-router-dom'
import MessageIcon from '../../assets/MessageIcon'
import styles from './messages.module.css'

type MessageCardProps = {
    message: Message
}

export default function MessageCard({ message }: MessageCardProps) {
    const { name, content, read, id } = message

    const navigate = useNavigate()
    
    // truncate the message content to less than 75 characters to remove UI clutter
    function truncateMessage(messageContent: string) {
        // return message content if already less than 75 characters
        if (messageContent.length < 75) return messageContent

        // select only the first 75 characters of the message
        let truncatedMessage = messageContent.slice(0, 75)

        // find the last space of the truncated string to prevent cutting off in the middle of a word
        const spaceIndex = truncatedMessage.lastIndexOf(' ')

        // slice the truncated string to the last space and add ellipses
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