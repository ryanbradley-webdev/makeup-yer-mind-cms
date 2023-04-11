type Blog = {
    id: string,
    comments: any[],
    title: string,
    slug: string,
    topics: string[],
    likes: number,
    createdAt: number | FieldValue,
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
    id?: string,
    likes: number,
    createdAt: number | FieldValue,
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
    payload: string
}

type Action = {
    type: string,
    payload?: string
}

type Firestore = {
    blogs: Blog[],
    looks: Look[],
    messages: Message[],
    allColors: Color[],
    saveBlog: (newLook: Blog, id: string | undefined) => Promise<void>,
    deleteBlog: (id: string) => Promise<void>,
    saveLook: (newLook: Look, id: string | undefined) => Promise<void>,
    deleteLook: (id: string) => Promise<void>,
    getMessages: () => void
}