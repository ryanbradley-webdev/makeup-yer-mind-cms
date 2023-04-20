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

    useEffect(() => {
        if (!specificMessage?.read) {
            changeMessageStatus()
        }
    }, [])

    return (
        <main>
            
            <div className="wrapper">
                
                <h1>{specificMessage?.name}</h1>

                <button onClick={changeMessageStatus}>Mark as unread</button>
                
                <h5>{specificMessage && new Date(specificMessage.sentAt).toLocaleDateString()}</h5>
                
                <p className={styles.content}>{specificMessage?.content}</p>
                
            </div>
            
        </main>
    )
}