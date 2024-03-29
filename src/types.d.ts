type Blog = {
    id: string,
    comments: number,
    title: string,
    slug: string,
    topics: string[],
    author: string,
    likes: number,
    createdAt?: FieldValue,
    updatedAt?: FieldValue,
    views: number,
    image: string,
    content: string,
    description: string,
    draft: boolean,
    type: 'products' | 'tutorial' | 'lifestyle' | 'state-of-mind',
    docType: 'blog'
}

type Look = {
    id: string,
    comments: number,
    title: string,
    slug: string,
    tags: string[],
    colors: Color[],
    likes: number,
    createdAt?: FieldValue,
    updatedAt?: FieldValue,
    views: number,
    image1: string,
    image2: string,
    content: string,
    description: string,
    draft: boolean,
    docType: 'look'
}

type Color = {
    id: string,
    image: string,
    name: string,
    brand: string,
    category: string,
    link: string
}

type Message = {
    id: string,
    name: string,
    content: string,
    read: boolean,
    sentAt: FieldValue,
    docType: 'message'
}

type ColorMatch = {
    id: string,
    firstName: string,
    lastName:string,
    email: string,
    referral: string,
    veinColor: string,
    coverage: string,
    selfie: string,
    customCart: boolean,
    address?: string,
    phone?: string,
    read: boolean,
    completed: boolean,
    sentAt: FieldValue,
    docType: 'color-match'
}

type Promo = {
    id: string,
    title: string,
    slug: string,
    description: string,
    image: string,
    link: string,
    active: boolean,
    createdAt: FieldValue,
    updatedAt?: FieldValue,
    expiresAt: FieldValue | null,
    docType: 'promotion'
}

type DispatchArg = {
    type: string,
    payload: string | string[] | Color[]
}

type Action = {
    type: string,
    payload?: string | string [] | Blog | Look | Color[]
}

type Firestore = {
    blogs: Blog[],
    looks: Look[],
    messages: Message[],
    colorMatches: ColorMatch[],
    promos: Promo[],
    allColors: Color[],
    saveArticle: (newArticle: Blog | Look | Promo) => Promise<void>,
    deleteArticle: (id: string, type: string) => Promise<void>,
    uploadImg: (imagePath: string, imageName: string, file: File) => Promise<unknown>,
    toggleMessageRead: (id: string, status: boolean) => Promise<string>,
    toggleColorMatchRead: (id: string, status: boolean) => Promise<string>,
    toggleColorMatchComplete: (id: string, status: boolean) => Promise<string>
}

type ChuckNorrisFact = {
    icon_url: string,
    id: string,
    url: string,
    value: string
}