import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { dataIsBlog } from "./typeCheck";

export async function getAllBlogs() {
    const blogsRef = collection(db, 'blogs')

    const q = query(blogsRef, orderBy('createdAt', 'desc'))

    const blogsSnap = await getDocs(q)

    const publishedBlogs: Blog[] = []
    const draftBlogs: Blog[] = []

    blogsSnap.forEach(doc => {
        const docData = doc.data()

        console.log(docData.title)

        if (dataIsBlog(docData)) {
            if (docData.draft) {
                draftBlogs.push(docData)
            } else {
                publishedBlogs.push(docData)
            }
        }
    })

    return draftBlogs.concat(publishedBlogs)
}