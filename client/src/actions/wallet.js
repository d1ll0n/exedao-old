import {CREATE_WALLET, UPDATE_WALLET, LOAD_WALLET} from '../store/reducers/wallet'
const {abi, bytecode: megaBytes} = require('../sol/build/M3gaWallet')

export const createWallet = (owners, threshold) => {
  return async (dispatch, getState) => {
    dispatch({ type: CREATE_WALLET })
    const web3 = getState().web3.web3
    console.log(owners)
    const wallet = await new web3.eth.Contract(abi)
      .deploy({
        data: megaBytes,
        arguments: [owners, threshold]
      })
      .send({ from: owners[0], gas: 4700000 })
    console.log(wallet._address)
    dispatch({ type: UPDATE_WALLET, owners, threshold, wallet })
  }
}

export const loadWallet = address => {
  return async (dispatch, getState) => {
    const web3 = getState().web3.web3
    dispatch({ type: LOAD_WALLET })
    const wallet = new web3.eth.Contract(abi, address)
    const owners = await wallet.methods.getOwners().call()
    let threshold = await wallet.methods.threshold().call()
    console.log(threshold, owners)
    dispatch({ type: UPDATE_WALLET, owners, threshold, wallet })
  }
}

export const clearStore = () => {
  return dispatch => dispatch({type: 'CLEAR_STORE'})
}