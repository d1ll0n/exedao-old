import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {loadWeb3} from '../../actions/web3'
import CircularProgress from '@material-ui/core/CircularProgress';
import WalletMaker from '../wallet/create';
import WalletLoader from '../wallet/load';
import WalletVoter from '../wallet/voting'

class App extends Component {
  componentDidMount = () => {
    this.props.loadWeb3()
    this.props.goHome();
  }
  
  renderHeader = () => {
    const {wallet, owners} = this.props;
    if (!wallet) return <header>
      <Link to="/wallet/create">Make a new M3gaWallet</Link>
      {
        ' '
      }
      <Link to="/wallet/load">Load an existing M3gaWallet</Link>
    </header>
    return <header>
      <Link to="/wallet/vote">Make some votes bitch</Link>
    </header>
  }

  renderLoading = () => <div>
    <h1>Loading web3...</h1>
    <CircularProgress color="primary" />
  </div>

  renderMain = () => <main>
    <Route exact path="/wallet/create" component={WalletMaker} />
    <Route exact path="/wallet/load" component={WalletLoader} />
    <Route exact path="/wallet/vote" component={WalletVoter} />
  </main>

  render() {
    const {account, loading} = this.props;
    if (loading || !account) return this.renderLoading();
    return <div>
      {this.renderHeader()}
      {this.renderMain()}
    </div>
  }
}

const mapStateToProps = ({ web3, wallet }) => ({
  account: web3.accounts[0],
  wallet: wallet.wallet,
  loading: web3.loading,
  loaded: web3.loaded,
  owners: wallet.owners
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadWeb3,
  goHome: () => push('/')
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)