export const initialLook: Look = {
    id: '',
    title: '',
    slug: '',
    description: '',
    image1: '',
    image2: '',
    content: '',
    tags: [],
    colors: [],
    comments: [],
    likes: 0,
    views: 0,
    createdAt: null,
    draft: true
}

export function reducer (state: Look, action: Action): Look {
    let newLook

    switch (action.type) {
        
        case ACTIONS.CHANGE_TITLE:
            newLook = { ...state, title: action.payload }
            break

        case ACTIONS.CHANGE_DESCRIPTION:
            newLook = { ...state, description: action.payload }
            break

        case ACTIONS.CHANGE_IMAGE_1:
            newLook = { ...state, image1: action.payload }
            break

        case ACTIONS.CHANGE_IMAGE_2:
            newLook = { ...state, image2: action.payload }
            break

        case ACTIONS.CHANGE_CONTENT:
            newLook = { ...state, content: action.payload }
            break

        case ACTIONS.ADD_TAG:
            newLook = { ...state, tags: [...state.tags, action.payload] }
            break

        case ACTIONS.DELETE_TAG:
            newLook = { ...state, tags: state.tags.filter(tag => tag !== action.payload) }
            break

        case ACTIONS.ADD_COLORS:
            newLook = { ...state, colors: [...state.colors, ...(action.payload as string[])] }
            break

        case ACTIONS.DELETE_COLOR:
            newLook = { ...state, colors: state.colors.filter((color: string) => color !== action.payload)}
            break

        case ACTIONS.REFRESH_LOOK:
            newLook = action.payload
            break

        default:
            newLook = state
            break
    }

    return newLook as Look
}

export const ACTIONS = {
    CHANGE_TITLE: 'changeTitle',
    CHANGE_DESCRIPTION: 'changeDescription',
    CHANGE_IMAGE_1: 'changeImage1',
    CHANGE_IMAGE_2: 'changeImage2',
    CHANGE_CONTENT: 'changeContent',
    ADD_TAG: 'addTag',
    DELETE_TAG: 'deleteTag',
    ADD_COLORS: 'addColors',
    DELETE_COLOR: 'deleteColor',
    REFRESH_LOOK: 'refreshLook'
}