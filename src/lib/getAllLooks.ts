import { db } from "./firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dataIsLook } from "./typeCheck";

export async function getAllLooks() {
    const looksRef = collection(db, 'looks')

    const q = query(looksRef, orderBy('createdAt', 'desc'))

    const looksSnap = await getDocs(q)

    const publishedLooks: Look[] = []
    const draftLooks: Look[] = []

    looksSnap.forEach(doc => {
        const docData = doc.data()

        if (dataIsLook(docData)) {
            if (docData.draft) {
                draftLooks.push(docData)
            } else {
                publishedLooks.push(docData)
            }
        }
    })

    publishedLooks.sort((a: Look, b: Look) => b.createdAt.seconds - a.createdAt.seconds)

    return draftLooks.concat(publishedLooks)
}