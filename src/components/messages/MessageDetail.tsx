import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataContext from '../../contexts/DataContext'
import styles from './messages.module.css'

export default function MessageDetail() {
    const { id } = useParams()
    const { messages } = useContext(DataContext) as Firestore
    const specificMessage = messages.find((message: Message) => message.id === id)

    const navigate = useNavigate()

    return (
        <main>
            <div className="wrapper">
                <h1>{specificMessage?.name}</h1>
                <h5>{specificMessage && new Date(specificMessage.sentAt).toLocaleDateString()}</h5>
                <p className={styles.content}>{specificMessage?.content}</p>
            </div>
        </main>
    )
}