import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Route, Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadWeb3 } from '../../actions/web3'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import WalletMaker from '../wallet/create'
import WalletLoader from '../wallet/load'
import HomeIcon from '@material-ui/icons/Home'
import WalletVoter from '../wallet/voting'
import Home from '../home'

const styles = theme => ({
  box: {
    marginTop: 75,
    width: '65%'
  },
  button: {
    height: 75,
    fontFamily: 'Monospace',
    fontSize: 18
  },
  link: {
    display: 'block',
    height: '100%',
    width: '100%'
  },
  home: {
    color: 'white',
    fontFamily: 'Monospace',
    fontSize: 28
  },
  title: {
    marginTop: 50,
    marginBottom: '35%',
    fontFamily: 'Monospace'
  },
  subheader: {
    marginLeft: 25,
    marginRight: 25,
    fontFamily: 'Monospace'
  },
  content: {
    marginBottom: 200
  }
})

class App extends Component {
  componentDidMount = () => {
    this.props.loadWeb3()
    this.props.goHome()
  }

  renderHeader = () => {
    const { classes } = this.props
    return (
      <AppBar className={classes.appbar}>
        <Link to="/">
          <Button className={classes.button}>
            <Typography className={classes.home}>HOME</Typography>
          </Button>
        </Link>
      </AppBar>
    )
  }

  renderLoading = () => (
    <div>
      <h1>Loading web3...</h1>
      <CircularProgress color="primary" />
    </div>
  )

  renderMain = () => (
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/wallet/create" component={WalletMaker} />
      <Route exact path="/wallet/load" component={WalletLoader} />
      <Route exact path="/wallet/vote" component={WalletVoter} />
    </main>
  )

  render() {
    const { account, loading } = this.props
    if (loading || !account) return this.renderLoading()
    return (
      <div>
        {this.renderHeader()}
        {this.renderMain()}
      </div>
    )
  }
}

const mapStateToProps = ({ web3, wallet }) => ({
  account: web3.accounts[0],
  wallet: wallet.wallet,
  loading: web3.loading,
  loaded: web3.loaded,
  owners: wallet.owners
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWeb3,
      goHome: () => push('/'),
      goVote: () => push('/wallet/vote')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
