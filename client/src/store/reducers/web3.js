export const LOAD_WEB3_REQUESTED = `web3/LOAD_REQUEST`
export const LOAD_WEB3_SUCCESS = `web3/LOAD_SUCCESS`
export const LOAD_WEB3_FAILURE = `web3/LOAD_FAILURE`

const initialState = {
    web3: null,
    accounts: [],
    loading: false,
    loaded: false,
    failed: false
}

export default (state = initialState, action) => {
    const {web3, accounts, type} = action;
    switch (type) {
        case LOAD_WEB3_REQUESTED:
            return {...state, loading: true}
        case LOAD_WEB3_SUCCESS:
            return {...state, web3, accounts, loading: false}
        case LOAD_WEB3_FAILURE:
            return {...state, loading: false, failed: true }
        default:
            return state
    }
}