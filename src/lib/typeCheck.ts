import { DocumentData } from "firebase/firestore";

export const dataIsBlog = (data: DocumentData): data is Blog => {
    return data.docType === 'blog'
}

export const dataIsLook = (data: DocumentData): data is Look => {
    return data.docType === 'look'
}

export const dataIsColor = (data: DocumentData): data is Color => {
    return data.docType === 'color'
}

export const dataIsPromo = (data: DocumentData): data is Promo => {
    return data.docType === 'promotion'
}