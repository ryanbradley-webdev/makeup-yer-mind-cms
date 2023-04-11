import { useContext } from 'react'
import DataContext from '../../contexts/DataContext'
import MessageCard from './MessageCard'

export default function Messages() {
    const { messages } = useContext(DataContext) as Firestore

    return (
        <main>
            <h1 style={{ marginBottom: '2rem' }}>Messages</h1>
            {messages && messages.map((message: Message) => (
                <MessageCard message={message} key={message.id} />
            ))}
        </main>
    )
}