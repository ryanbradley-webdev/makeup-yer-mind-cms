import { collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore"
import { db } from "./firebase"
import { dataIsPromo } from "./typeCheck"

export async function getAllPromos() {
    const promosRef = collection(db, 'promotions')

    const q = query(promosRef, orderBy('createdAt', 'desc'))

    const promosSnap = await getDocs(q)

    const activePromos: Promo[] = []
    const inactivePromos: Promo[] = []

    promosSnap.forEach(snap => {
        const docData = snap.data()

        if (dataIsPromo(docData)) {

            if (docData.active) {

                if (docData.expiresAt) {

                    const currentDate = new Date()
                    const expirationDate = new Date(docData.expiresAt.seconds * 1000)

                    if (currentDate > expirationDate) {

                        const docRef = doc(promosRef, snap.id)
                        updateDoc(docRef, { active: false })
                        docData.active = false
                        inactivePromos.push(docData)

                    } else {

                        activePromos.push(docData)

                    }
                } else {

                    activePromos.push(docData)

                }
            } else {

                inactivePromos.push(docData)

            }
        }
    })

    return [ ...activePromos, ...inactivePromos ]
}