import { createContext, useEffect, useState } from "react";
import { db, storage } from '../lib/firebase'
import { collection, doc, setDoc, deleteDoc, query, orderBy, getDocs, DocumentData, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const DataContext = createContext<Firestore | null>(null)

export function DataProvider({ children }: any) {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [looks, setLooks] = useState<Look[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [colorMatches, setColorMatches] = useState<ColorMatch[]>([])
    const [allColors, setAllColors] = useState<Color[]>([])

    async function getBlogs() {
        setBlogs(await getFirestoreDocuments('blogs', true) as Blog[])
    }

    async function getLooks() {
        setLooks(await getFirestoreDocuments('looks', true) as Look[])
    }

    async function getMessages() {
        setMessages(await getFirestoreDocuments('messages', true) as Message[])
    }

    async function getColorMatches() {
        setColorMatches(await getFirestoreDocuments('color-matches', true) as ColorMatch[])
    }

    async function getAllColors() {
        setAllColors(await getFirestoreDocuments('color-samples', false) as Color[])
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

    async function uploadImg(imagePath: string, imageName: string, file: File) {
        // create a new reference in firebase storage for the image
        const imageRef = ref(storage, `${imagePath}/${imageName}`)

        // commence file upload and return a promise for the result of the upload
        return uploadBytesResumable(imageRef, file)
            // if success return the download URL
            .then(async () => {
                return await getDownloadURL(imageRef)
            })
            // if failure return the error
            .catch(err => err.message)
    }

    async function toggleMessageRead(id: string, status: boolean) {
        const messageRef = doc(db, 'messages', id)
        return await updateDoc(messageRef, { read: !status })
            .then(() => {
                getMessages()
                return 'sucess'
            })
            .catch(err => err.message)
    }

    // on initial load, retrieve all necessary data from firestore
    useEffect(() => {
        getBlogs()
        getLooks()
        getMessages()
        getColorMatches()
        getAllColors()
    }, [])

    const value: Firestore = {
        blogs,
        looks,
        messages,
        allColors,
        getMessages,
        saveArticle,
        deleteArticle,
        uploadImg,
        toggleMessageRead
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

// modular function for getting all documents from each firestore collection individually
async function getFirestoreDocuments(type: string, isOrdered: boolean) {
    // initialize empty array for messages, color samples, and published blogs and looks
    const content: DocumentData[] = []

    // initialize empty array for blog and look drafts
    const drafts: DocumentData[] = []

    // if query is to be ordered (all collections except colors) the property and direction is chosen based on type
    const orderByParam = type === 'messages' ? 'sentAt' : 'createdAt'
    const orderByDirection = type === 'messages' ? 'asc' : 'desc'

    // reference and query created, and documents fetched
    const docRef = collection(db, type)
    const q = isOrdered ? query(docRef, orderBy(orderByParam, orderByDirection)) : query(docRef)
    const docs = await getDocs(q)

    // documents are modified and sorted into the appropriate array
    docs.forEach(doc => {
        const docData = doc.data()

        // since the id field is not populated for colors and messages, the doc id is added to the JS object
        if (type === 'color-samples' || type === 'messages') {
            docData.id = doc.id
        }

        // drafts are placed in the draft array, all others are placed in the content array
        if (docData.draft) drafts.push(docData)
        else content.push(docData)
    })

    // the two arrays are combined such that drafts are placed first in the combined array, if present
    return drafts.concat(content)
}

export default DataContext