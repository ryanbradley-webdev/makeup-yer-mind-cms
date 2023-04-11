import { app } from '../lib/firebase'
import { getFirestore, collection, query, getDocs, orderBy, DocumentData } from 'firebase/firestore'

const db = getFirestore(app)

export async function getMessageData() {
    const content: Message[] = []
    const contentRef = collection(db, 'messages')
    const q = query(contentRef, orderBy('sentAt', 'asc'))
    const docs = await getDocs(q)
    docs.forEach(doc => {
        const message = doc.data()
        message.id = doc.id
        content.push(message as Message)
    })
    return content
}

export async function getColorData() {
    const colors: Color[] = []
    const contentRef = collection(db, 'color-samples')
    const q = query(contentRef)
    const docs = await getDocs(q)
    docs.forEach(doc => {
        const color = doc.data()
        color.id = doc.id
        colors.push(color as Color)
    })
    return colors
}

export async function getBlogData() {
    return await getArticleData('blogs') as Blog[]
}

export async function getLookData() {
    return await getArticleData('looks') as Look[]
}

async function getArticleData(contentType: string) {
    const content: DocumentData[] = []
    const drafts: DocumentData[] = []
    const contentRef = collection(db, contentType)
    const q = query(contentRef, orderBy('createdAt', 'desc'))
    const docs = await getDocs(q)
    docs.forEach(doc => {
        const article = doc.data()
        article.id = doc.id
        if (article.draft) drafts.push(article)
        else content.push(article)
    })
    return drafts.concat(content)
}