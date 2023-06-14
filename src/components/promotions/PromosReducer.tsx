export const initialPromo: Promo = {
    id: '',
    title: '',
    slug: '',
    image: '',
    createdAt: null,
    description: '',
    link: '',
    active: true,
    expiresAt: null,
    docType: 'promotion'
}

export function reducer(state: Promo, action: Action) {
    switch(action.type) {

        case ACTIONS.CHANGE_TITLE:
            return { ...state, title: action.payload } as Promo

        case ACTIONS.CHANGE_DESCRIPTION:
            return { ...state, description: action.payload } as Promo

        case 'change-image':
            return { ...state, image: action.payload } as Promo

        case 'change-link':
            return { ...state, link: action.payload } as Promo

        case 'change-expiration':
            return { ...state, expiresAt: action.payload } as Promo

        case 'change-status':
            return { ...state, active: !state.active } as Promo

        default:
            return state
    }
}

const ACTIONS = {
    CHANGE_TITLE: 'changeTitle',
    CHANGE_DESCRIPTION: 'changeDescription',
    CHANGE_CONTENT: 'changeContent',
}