import { createContext, useEffect, useState } from "react";
import { db, storage } from '../lib/firebase'
import { collection, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAllColors } from "../lib/getAllColors";
import { getAllBlogs } from "../lib/getAllBlogs";
import { getAllLooks } from "../lib/getAllLooks";
import { getAllMessages } from "../lib/getAllMessages";
import { getAllColorMatches } from "../lib/getAllColorMatches";
import { dataIsBlog, dataIsLook } from "../lib/typeCheck";

const DataContext = createContext<Firestore | null>(null)

export function DataProvider({ children }: any) {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [looks, setLooks] = useState<Look[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [colorMatches, setColorMatches] = useState<ColorMatch[]>([])
    const [allColors, setAllColors] = useState<Color[]>([])

    async function loadBlogs() {
        const blogs = await getAllBlogs()

        setBlogs(blogs)
    }

    async function loadLooks() {
        const looks = await getAllLooks()

        setLooks(looks)
    }

    async function loadMessages() {
        const messages = await getAllMessages()

        setMessages(messages)
    }

    async function loadColorMatches() {
        const colorMatches = await getAllColorMatches()

        setColorMatches(colorMatches)
    }

    async function loadColors() {
        const colors = await getAllColors()

        setAllColors(colors)
    }

    async function saveArticle(newArticle: Blog | Look) {
        // initialize null variable to store firestore reference
        let articleRef = null

        let type =
            dataIsBlog(newArticle) && 'blogs' ||
            dataIsLook(newArticle) && 'looks'

        if (!type) return
        
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
                if (type === 'blogs') loadBlogs()
                if (type === 'looks') loadLooks()
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
                if (type === 'blogs') loadBlogs()
                if (type === 'looks') loadLooks()
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
                loadMessages()
                return 'success'
            })
            .catch(err => err.message)
    }

    async function toggleColorMatchRead(id:string, status: boolean) {
        const colorMatchRef = doc(db, 'color-matches', id)
        return await updateDoc(colorMatchRef, { read: !status })
            .then(() => {
                loadColorMatches()
                return 'success'
            })
            .catch(err => err.message)
    }

    async function toggleColorMatchComplete(id:string, status: boolean) {
        const colorMatchRef = doc(db, 'color-matches', id)
        return await updateDoc(colorMatchRef, { completed: !status })
            .then(() => {
                loadColorMatches()
                return 'success'
            })
            .catch(err => err.message)
    }

    // on initial load, retrieve all necessary data from firestore
    useEffect(() => {
        loadBlogs()
        loadLooks()
        loadMessages()
        loadColorMatches()
        loadColors()
    }, [])

    const value: Firestore = {
        blogs,
        looks,
        messages,
        colorMatches,
        allColors,
        saveArticle,
        deleteArticle,
        uploadImg,
        toggleMessageRead,
        toggleColorMatchRead,
        toggleColorMatchComplete
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext