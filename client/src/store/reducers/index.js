import { combineReducers } from 'redux'
import wallet from './wallet'
import web3 from './web3'

export default combineReducers({
  wallet,
  web3
})
