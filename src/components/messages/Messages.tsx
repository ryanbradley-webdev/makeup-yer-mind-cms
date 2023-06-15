import { useContext } from 'react'
import DataContext from '../../contexts/DataContext'
import MessageCard from './MessageCard'
import NoContent from '../shared/NoContent'

export default function Messages() {
    const { messages } = useContext(DataContext) as Firestore

    return (
        <main>
            
            <div className="wrapper">
                
                <h1 style={{ marginBottom: '2rem' }}>Messages</h1>
                
                {messages?.length > 0 ?

                    messages.map((message: Message) => (
                        <MessageCard message={message} key={message.id} />
                    ))

                    :

                    <NoContent />
                }
                
            </div>
            
        </main>
    )
}