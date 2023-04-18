import { useEffect, useReducer } from 'react'

export default function useLocalStorageReducer(id: string | undefined, article: Blog | Look) {
    const [state, dispatch] = useReducer(reducer, article, initializer)

    function initializer(initialState: Blog | Look) {
        if (id) {
            const storedJSON = localStorage.getItem(id)
            const storedState = storedJSON ? JSON.parse(storedJSON) : null
            if (storedState) {
                return storedState
            } else {
                localStorage.setItem(id, JSON.stringify(initialState))
            }
        }
    
        return initialState
    }

    useEffect(() => {
        if (state.id) {
            localStorage.setItem(state.id, JSON.stringify(state))
        }
    }, [state])

    return [state, dispatch]
}

function reducer (state: any, action: Action) {
    let newState: any

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
            newState = { ...state, topics: state.topics.filter((topic: string) => topic !== action.payload) }
            break
        case ACTIONS.CHANGE_IMAGE_1:
            newState = { ...state, image1: action.payload }
            break
        case ACTIONS.CHANGE_IMAGE_2:
            newState = { ...state, image2: action.payload }
            break
        case ACTIONS.ADD_TAG:
            newState = { ...state, tags: [...state.tags, action.payload] }
            break
        case ACTIONS.DELETE_TAG:
            newState = { ...state, tags: state.tags.filter((tag: string) => tag !== action.payload) }
            break
        case ACTIONS.ADD_COLORS:
            newState = { ...state, colors: [...state.colors, ...(action.payload as string[])] }
            break
        case ACTIONS.DELETE_COLOR:
            newState = { ...state, colors: state.colors.filter((color: string) => color !== action.payload)}
            break
        case 'refresh':
            console.log(state.id)
            newState = action.payload
            break
        default:
            newState = state
            break
    }

    return newState
}

const ACTIONS = {
    CHANGE_TITLE: 'changeTitle',
    CHANGE_DESCRIPTION: 'changeDescription',
    CHANGE_IMAGE: 'changeImage',
    CHANGE_IMAGE_1: 'changeImage1',
    CHANGE_IMAGE_2: 'changeImage2',
    CHANGE_CONTENT: 'changeContent',
    ADD_TOPIC: 'addTopic',
    DELETE_TOPIC: 'deleteTopic',
    ADD_TAG: 'addTag',
    DELETE_TAG: 'deleteTag',
    ADD_COLORS: 'addColors',
    DELETE_COLOR: 'deleteColor'
}