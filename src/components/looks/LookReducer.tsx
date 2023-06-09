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
    comments: 0,
    likes: 0,
    views: 0,
    createdAt: null,
    draft: true,
    docType: 'look'
}

export function reducer (state: Look, action: Action): Look {
    let newLook

    const payload: unknown = action.payload

    switch (action.type) {
        
        case ACTIONS.CHANGE_TITLE:
            newLook = { ...state, title: payload }
            break

        case ACTIONS.CHANGE_DESCRIPTION:
            newLook = { ...state, description: payload }
            break

        case ACTIONS.CHANGE_IMAGE_1:
            newLook = { ...state, image1: payload }
            break

        case ACTIONS.CHANGE_IMAGE_2:
            newLook = { ...state, image2: payload }
            break

        case ACTIONS.CHANGE_CONTENT:
            newLook = { ...state, content: payload }
            break

        case ACTIONS.ADD_TAG:
            newLook = { ...state, tags: [...state.tags, payload] }
            break

        case ACTIONS.DELETE_TAG:
            newLook = { ...state, tags: state.tags.filter(tag => tag !== payload) }
            break

        case ACTIONS.ADD_COLORS:
            newLook = { ...state, colors: [...state.colors, ...(payload as Color[])] }
            break

        case ACTIONS.DELETE_COLOR:
            newLook = { ...state, colors: state.colors.filter((color: Color) => color.id !== payload)}
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