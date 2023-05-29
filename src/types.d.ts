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
    colors: Color[],
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
    sentAt: FieldValue
}

type ColorMatch = {
    id?: string,
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
    completed: boolean
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
    allColors: Color[],
    getMessages: () => void,
    saveArticle: (newArticle: Blog | Look, type: string) => Promis<void>,
    deleteArticle: (id: string, type: string) => Promise<void>,
    uploadImg: (imagePath: string, imageName: string, file: File) => Promise<unknown>,
    toggleMessageRead: (id: string, status: boolean) => Promise<any>
}