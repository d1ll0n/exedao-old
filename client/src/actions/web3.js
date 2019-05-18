import Web3 from 'web3';
import { LOAD_WEB3_REQUESTED, LOAD_WEB3_SUCCESS, LOAD_WEB3_FAILURE } from '../store/reducers/web3';

export const loadWeb3 = () => {
    return async dispatch => {
        dispatch({type: LOAD_WEB3_REQUESTED})
        if (window.ethereum) await window.ethereum.enable()
        if (!window.web3) dispatch({type: LOAD_WEB3_FAILURE})
        else {
            const web3 = new Web3(window.web3.currentProvider)
            const accounts = await web3.eth.getAccounts()
            console.log(accounts)
            dispatch({type: LOAD_WEB3_SUCCESS, web3, accounts})
        }
    }
}