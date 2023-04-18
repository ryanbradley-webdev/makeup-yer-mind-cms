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
    updatedAt: null,
    draft: true
}

export function reducer (state: Blog, action: Action): Blog {
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

        case ACTIONS.ADD_TOPIC:
            newState = { ...state, topics: [...state.topics, action.payload] }
            break

        case ACTIONS.DELETE_TOPIC:
            newState = { ...state, topics: state.topics.filter(topic => topic !== action.payload) }
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
    ADD_TOPIC: 'addTopic',
    DELETE_TOPIC: 'deleteTopic',
    REFRESH_BLOG: 'refreshBlog'
}