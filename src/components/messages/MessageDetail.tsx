import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataContext from '../../contexts/DataContext'
import styles from './messages.module.css'

export default function MessageDetail() {
    const { id } = useParams()
    const { messages, toggleMessageRead } = useContext(DataContext) as Firestore
    const specificMessage = messages.find((message: Message) => message.id === id)

    const navigate = useNavigate()
    // TODO add back button to return to messages overview

    function changeMessageStatus() {
        if (id && specificMessage) {
            toggleMessageRead(id, specificMessage.read)
        }
    }

    function markMessageUnread() {
        if (specificMessage?.read) changeMessageStatus()
    }

    useEffect(() => {
        if (!specificMessage?.read) {
            changeMessageStatus()
        }
    }, [])

    return (
        <main>
            
            <div className={styles.detail}>
                
                {specificMessage ? (
                    <div className={styles.message}>

                        <h1><span>Sent by: </span>{specificMessage.name}</h1>

                        <button className={styles.btn} onClick={markMessageUnread}>Mark as unread</button>
                        
                        <h5><span>Sent on: </span>{new Date(specificMessage.sentAt.seconds * 1000).toDateString()}</h5>
                        
                        <span>Message:<br /></span>

                        <p className={styles.content}>
                            {specificMessage.content}
                        </p>
                    
                    </div>
                ) : (
                    <div>Message not found</div>
                )}

            </div>
            
        </main>
    )
}