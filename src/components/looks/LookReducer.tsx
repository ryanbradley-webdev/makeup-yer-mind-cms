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
    switch (action.type) {
        case ACTIONS.CHANGE_TITLE:
            return { ...state, title: action.payload } as Look
        case ACTIONS.CHANGE_DESCRIPTION:
            return { ...state, description: action.payload } as Look
        case ACTIONS.CHANGE_IMAGE_1:
            return { ...state, image1: action.payload } as Look
        case ACTIONS.CHANGE_IMAGE_2:
            return { ...state, image2: action.payload } as Look
        case ACTIONS.CHANGE_CONTENT:
            return { ...state, content: action.payload } as Look
        case ACTIONS.ADD_TAG:
            return { ...state, tags: [...state.tags, action.payload] } as Look
        case ACTIONS.DELETE_TAG:
            return { ...state, tags: state.tags.filter(tag => tag !== action.payload) } as Look
        case ACTIONS.ADD_COLOR:
            return { ...state, colors: [...state.colors, action.payload] } as Look
        case ACTIONS.DELETE_COLOR:
            return { ...state, colors: state.colors.filter((color: string) => color !== action.payload)} as Look
        default:
            return state as Look
    }
}

export const ACTIONS = {
    CHANGE_TITLE: 'changeTitle',
    CHANGE_DESCRIPTION: 'changeDescription',
    CHANGE_IMAGE_1: 'changeImage1',
    CHANGE_IMAGE_2: 'changeImage2',
    CHANGE_CONTENT: 'changeContent',
    ADD_TAG: 'addTag',
    DELETE_TAG: 'deleteTag',
    ADD_COLOR: 'addColor',
    DELETE_COLOR: 'deleteColor'
}