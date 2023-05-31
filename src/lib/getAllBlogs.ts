import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { dataIsBlog } from "./typeCheck";

export async function getAllBlogs() {
    const blogsRef = collection(db, 'blogs')

    const blogsSnap = await getDocs(blogsRef)

    const publishedBlogs: Blog[] = []
    const draftBlogs: Blog[] = []

    blogsSnap.forEach(doc => {
        const docData = doc.data()

        if (dataIsBlog(docData)) {
            if (docData.draft) {
                draftBlogs.push(docData)
            } else {
                publishedBlogs.push(docData)
            }
        }
    })

    publishedBlogs.sort((a: Blog, b: Blog) => b.createdAt.seconds - a.createdAt.seconds)

    return draftBlogs.concat(publishedBlogs)
}