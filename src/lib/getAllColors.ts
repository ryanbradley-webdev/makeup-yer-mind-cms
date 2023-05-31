import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"
import { dataIsColor } from "./typeCheck"

export async function getAllColors() {
    const colorsRef = collection(db, 'color-samples')

    const colorsSnap = await getDocs(colorsRef)

    const colors: Color[] = []

    colorsSnap.forEach(doc => {
        const { id } = doc
        const docData = doc.data()

        if (dataIsColor(docData)) {
            colors.push({
                ...docData,
                id
            })
        }
    })

    return colors
}