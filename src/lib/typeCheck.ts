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

export const dataIsMessage = (data: DocumentData): data is Message => {
    return data.docType === 'message'
}

export const dataIsColorMatch = (data: DocumentData): data is ColorMatch => {
    return data.docType === 'color-match'
}

export const dataIsFact = (data: any): data is ChuckNorrisFact => {
    if (!data) return false

    return data.icon_url && data.value
}