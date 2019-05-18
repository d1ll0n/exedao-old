import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { soliditySha3 } from 'web3-utils'
import CircularProgress from '@material-ui/core/CircularProgress';
import SolInput from '../../components/SolInput'

const hashBytecode = bytecode => soliditySha3({
    t: 'bytes',
    v: bytecode
})

class WalletVoting extends Component {
    state = {
        bytecode: '',
        votes: null,
        loading: false
    }

    componentDidMount = () => {
        if (!this.props.wallet) this.props.changePage()
    }

    checkVote = async () => {
        this.setState({loading: true})
        const {bytecode} = this.state
        const {wallet} = this.props
        const status = await wallet.methods.getPayloadStatus(bytecode).call()
        console.log(status)
        this.setState({votes: status.yesVotes, loading: false})
    }

    placeVote = async () => {
        const {bytecode} = this.state
        const {web3, account, wallet} = this.props
        const receipt = await web3.eth.sendTransaction({
            from: account,
            to: wallet._address || wallet.address,
            data: bytecode,
            gas: 600000
        })
        console.log(receipt)
    }

    handleInput = (bytecode) => {
        console.log(bytecode)
        console.log(`bytecode received -- hash ${hashBytecode(bytecode)}`)
        this.setState({bytecode})
    }

    render() {
        const {loading} = this.state
        return (
            <div>
                <h1>Input some code, ya jabronester</h1>
                <SolInput onSubmit={this.handleInput} />
                {
                    loading 
                    ? 
                        <div>
                            <h1>Loading the vote count...</h1>
                            <CircularProgress />
                        </div>
                    : ''
                }
                <Button onClick={this.checkVote}>Check Status</Button>
                <Button onClick={this.placeVote}>Vote!</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ wallet, web3 }) => ({
    isLoading: wallet.loadPending,
    wallet: wallet.wallet,
    threshold: wallet.threshold,
    account: web3.accounts[0],
    web3: web3.web3
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/')
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletVoting)