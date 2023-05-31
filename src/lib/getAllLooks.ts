import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { dataIsLook } from "./typeCheck";

export async function getAllLooks() {
    const looksRef = collection(db, 'looks')

    const looksSnap = await getDocs(looksRef)

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