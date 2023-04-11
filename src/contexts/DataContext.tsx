import { createContext, useEffect, useState } from "react";
import { getMessageData, getBlogData, getLookData, getColorData } from '../hooks/useFirestore'
import { app } from '../lib/firebase'
import { getFirestore, collection, doc, setDoc, deleteDoc } from 'firebase/firestore'

const db = getFirestore(app)

const DataContext = createContext<Firestore | null>(null)

export function DataProvider({ children }: any) {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [looks, setLooks] = useState<Look[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [allColors, setAllColors] = useState<Color[]>([])

    async function getBlogs() {
        setBlogs(await getBlogData())
    }

    async function getLooks() {
        setLooks(await getLookData())
    }

    async function getMessages() {
        setMessages(await getMessageData())
    }

    async function getAllColors() {
        setAllColors(await getColorData())
    }

    async function saveBlog(newBlog: Blog, id: string | undefined) {
        if (id) return await setDoc(doc(db, 'blogs', id), newBlog)
                        .then(() => getBlogs())
                        .catch(err => err)
        else return await setDoc(doc(collection(db, 'blogs')), newBlog)
                        .then(() => getBlogs())
                        .catch(err => err)
    }

    async function deleteBlog(id: string) {
        return await deleteDoc(doc(db, 'blogs', id))
                        .then(() => getBlogs())
                        .catch(err => err)
    }

    async function saveLook(newLook: Look, id: string | undefined) {
        if (id) return await setDoc(doc(db, 'looks', id), newLook)
                        .then(() => getLooks())
                        .catch(err => err)
        else return await setDoc(doc(collection(db, 'looks')), newLook)
                        .then(() => getLooks())
                        .catch(err => err)
    }

    async function deleteLook(id: string) {
        return await deleteDoc(doc(db, 'looks', id))
                        .then(() => getLooks())
                        .catch(err => err)
    }

    useEffect(() => {
        getBlogs()
        getLooks()
        getMessages()
        getAllColors()
    }, [])

    const value: Firestore = {
        blogs,
        looks,
        messages,
        allColors,
        saveBlog,
        deleteBlog,
        saveLook,
        deleteLook,
        getMessages,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext