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

    async function saveArticle(newArticle: Blog | Look, type: string) {
        // initialize null variable to store firestore reference
        let articleRef = null
        
        // determine whether the supplied article has an id
        // an id should exist if the supplied article is a previous draft or is a live article being edited
        // a newly created article will have no id
        if (newArticle.id) {
            // set articleRef equal to the existing doc ref using the supplied id
            articleRef = doc(db, type, newArticle.id)
        } else {
            // generate a new firestore doc ref
            articleRef = doc(collection(db, type))

            // set the id property of the new article equal to the id of the newly generated doc ref
            newArticle.id = articleRef.id
        }

        // save the new article to firestore using the saved doc ref
        return setDoc(articleRef, newArticle)
            // if success refresh cached articles
            .then(() => {
                if (type === 'blogs') getBlogs()
                if (type === 'looks') getLooks()
            })
            // if failure return the error
            .catch(err => err.message)
    }

    async function deleteArticle(id: string, type: string) {
        // if no id or type supplied, bail
        if (!id || !type) return

        // find and delete article from firestore
        return await deleteDoc(doc(db, type, id))
            // if success refresh cached articles
            .then(() => {
                if (type === 'blogs') getBlogs()
                if (type === 'looks') getLooks()
            })
            // if failure return the error
            .catch(err => err.message)
    }

    // on initial load, retrieve all necessary data from firestore
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
        getMessages,
        saveArticle,
        deleteArticle
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext