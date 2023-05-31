import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "./firebase"
import { dataIsMessage } from "./typeCheck"

export async function getAllMessages() {
    const messagesRef = collection(db, 'messages')

    const q = query(messagesRef, orderBy('sentAt', 'desc'))

    const messagesSnap = await getDocs(q)

    const messages: Message[] = []

    messagesSnap.forEach(doc => {
        const { id } = doc
        const docData = doc.data()

        if (dataIsMessage(docData)) {
            messages.push({
                ...docData,
                id
            })
        }
    })

    return messages
}