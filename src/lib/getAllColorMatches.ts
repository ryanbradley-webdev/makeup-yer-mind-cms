import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "./firebase"
import { dataIsColorMatch } from "./typeCheck"

export async function getAllColorMatches() {
    const colorMatchesRef = collection(db, 'color-matches')

    const q = query(colorMatchesRef, orderBy('sentAt', 'desc'))

    const colorMatchesSnap = await getDocs(q)

    const colorMatches: ColorMatch[] = []

    colorMatchesSnap.forEach(doc => {
        const { id } = doc
        const docData = doc.data()

        if (dataIsColorMatch(docData)) {
            colorMatches.push({
                ...docData,
                id
            })
        }
    })

    return colorMatches
}