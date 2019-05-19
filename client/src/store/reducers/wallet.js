export const LOAD_WALLET = 'wallet/LOAD'
export const UPDATE_WALLET = 'wallet/UPDATE'
export const CREATE_WALLET = 'wallet/CREATE'

const initialState = {
    wallet: null,
    owners: [],
    createPending: false,
    loadPending: false,
    threshold: null
}

export default (state = initialState, action) => {
    const {wallet, owners, threshold, type} = action
    switch (type) {
        case UPDATE_WALLET:
            return {...state, threshold, createPending: false, loadPending: false, wallet, owners}
        case CREATE_WALLET:
            return {...state, loadPending: false, createPending: true}
        case LOAD_WALLET:
            return {...state, createPending: false, loadPending: true}
        case 'CLEAR_STORE':
            return initialState
        default:
            return state
    }
}