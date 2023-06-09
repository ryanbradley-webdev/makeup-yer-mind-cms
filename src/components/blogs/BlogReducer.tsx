export const initialBlog: Blog = {
    id: '',
    title: '',
    slug: '',
    description: '',
    image: '',
    content: '',
    topics: [],
    author: 'courtney',
    comments: 0,
    likes: 0,
    views: 0,
    createdAt: null,
    updatedAt: null,
    draft: true,
    type: 'products',
    docType: 'blog'
}

export function reducer(state: Blog, action: Action): Blog {
    let newState

    switch (action.type) {

        case ACTIONS.CHANGE_TITLE:
            newState = { ...state, title: action.payload }
            break

        case ACTIONS.CHANGE_DESCRIPTION:
            newState = { ...state, description: action.payload }
            break

        case ACTIONS.CHANGE_IMAGE:
            newState = { ...state, image: action.payload }
            break

        case ACTIONS.CHANGE_CONTENT:
            newState = { ...state, content: action.payload }
            break

        case ACTIONS.CHANGE_TYPE:
            newState = { ...state, type: action.payload }
            break

        case ACTIONS.ADD_TOPIC:
            newState = { ...state, topics: [...state.topics, action.payload] }
            break

        case ACTIONS.DELETE_TOPIC:
            newState = { ...state, topics: state.topics.filter(topic => topic !== action.payload) }
            break

        case ACTIONS.CHANGE_AUTHOR:
            newState = { ...state, author: action.payload }
            break

        case ACTIONS.REFRESH_BLOG:
            newState = action.payload
            break

        default:
            newState = state
            break
    }

    return newState as Blog
}

export const ACTIONS = {
    CHANGE_TITLE: 'changeTitle',
    CHANGE_DESCRIPTION: 'changeDescription',
    CHANGE_IMAGE: 'changeImage',
    CHANGE_CONTENT: 'changeContent',
    CHANGE_TYPE: 'changeType',
    ADD_TOPIC: 'addTopic',
    DELETE_TOPIC: 'deleteTopic',
    CHANGE_AUTHOR: 'changeAuthor',
    REFRESH_BLOG: 'refreshBlog'
}