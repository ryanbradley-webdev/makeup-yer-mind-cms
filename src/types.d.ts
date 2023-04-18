type Blog = {
    id: string,
    comments: any[],
    title: string,
    slug: string,
    topics: string[],
    likes: number,
    createdAt?: FieldValue,
    updatedAt?: FieldValue,
    views: number,
    image: string,
    content: string,
    description: string,
    draft: boolean
}

type Look = {
    id: string,
    comments: any[],
    title: string,
    slug: string,
    tags: string[],
    colors: string[],
    likes: number,
    createdAt?: FieldValue,
    updatedAt?: FieldValue,
    views: number,
    image1: string,
    image2: string,
    content: string,
    description: string,
    draft: boolean
}

type Color = {
    id: string,
    image: string,
    name: string,
    brand: string,
    category: string
}

type Message = {
    id?: string,
    name: string,
    content: string,
    read: boolean,
    sentAt: number
}

type DispatchArg = {
    type: string,
    payload: string | string[]
}

type Action = {
    type: string,
    payload?: string | string []
}

type Firestore = {
    blogs: Blog[],
    looks: Look[],
    messages: Message[],
    allColors: Color[],
    getMessages: () => void,
    saveArticle: (newArticle: Blog | Look, type: string) => Promis<void>,
    deleteArticle: (id: string, type: string) => Promise<void>
}