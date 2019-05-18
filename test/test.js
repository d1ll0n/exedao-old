const {expect} = require('chai')
const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')
const {abi, bytecode} = require('./sol/build/MegaWallet')

const deployWallet = addrs => new web3.eth.Contract(abi)
    .deploy({
        data: bytecode,
        arguments: [addrs, 5]
    }).send({from: addrs[0], gas: 4700000})

let contract, accounts
before(async () => {
    accounts = await web3.eth.getAccounts()
    contract = await deployWallet(accounts)
})

describe('MegaWallet Tests', () => {
    it('Should have deployed the contract', () => {
        console.log(contract._address)
        expect(contract._address).exist
    })
})