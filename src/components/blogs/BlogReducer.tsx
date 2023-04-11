export const initialBlog: Blog = {
    id: '',
    title: '',
    slug: '',
    description: '',
    image: '',
    content: '',
    topics: [],
    comments: [],
    likes: 0,
    views: 0,
    createdAt: null,
    draft: true
}

export function reducer (state: Blog, action: Action): Blog {
    switch (action.type) {
        case ACTIONS.CHANGE_TITLE:
            return { ...state, title: action.payload } as Blog
        case ACTIONS.CHANGE_DESCRIPTION:
            return { ...state, description: action.payload } as Blog
        case ACTIONS.CHANGE_IMAGE:
            return { ...state, image: action.payload } as Blog
        case ACTIONS.CHANGE_CONTENT:
            return { ...state, content: action.payload } as Blog
        case ACTIONS.ADD_TOPIC:
            return { ...state, topics: [...state.topics, action.payload] } as Blog
        case ACTIONS.DELETE_TOPIC:
            return { ...state, topics: state.topics.filter(topic => topic !== action.payload) } as Blog
        default:
            return state as Blog
    }
}

export const ACTIONS = {
    CHANGE_TITLE: 'changeTitle',
    CHANGE_DESCRIPTION: 'changeDescription',
    CHANGE_IMAGE: 'changeImage',
    CHANGE_CONTENT: 'changeContent',
    ADD_TOPIC: 'addTopic',
    DELETE_TOPIC: 'deleteTopic'
}