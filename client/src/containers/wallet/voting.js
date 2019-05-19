import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { soliditySha3 } from 'web3-utils'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import SolInput from '../../components/SolInput'
import { unstable_Box as Box } from '@material-ui/core/Box'

const styles = theme => ({
  box: {
    marginTop: 50,
    width: '65%'
  },
  inputBox: {
    marginBottom: 30
  },
  buttonContainer: {
    width: '30%',
    marginBottom: 100
  },
  header: {
    fontFamily: 'Monospace',
    marginTop: 30,
    marginBottom: 30
  },
  buttons: {
    fontFamily: 'Monospace',
    fontSize: 18
  }
})

const hashBytecode = bytecode =>
  soliditySha3({
    t: 'bytes',
    v: bytecode
  })

class WalletVoting extends Component {
  state = {
    bytecode: '',
    votes: null,
    loading: false,
    votesNeeded: null,
    receipt: null
  }

  componentDidMount = () => {
    if (!this.props.wallet) this.props.changePage()
  }

  checkVote = async () => {
    this.setState({ loading: true })
    const { bytecode } = this.state
    const { wallet, threshold } = this.props
    const votes = await wallet.methods.getPayloadStatus(bytecode).call()
    this.setState({ votesNeeded: threshold - votes, loading: false })
  }

  placeVote = async () => {
    const { bytecode } = this.state
    const { web3, account, wallet, threshold } = this.props
    const receipt = await web3.eth.sendTransaction({
      from: account,
      to: wallet._address || wallet.address,
      data: bytecode,
      gas: 600000
    })
    if (receipt.logs.length) this.setState({receipt})
    else {
      const votes = await wallet.methods.getPayloadStatus(bytecode).call()
      this.setState({votesNeeded: threshold - votes})
    }
    console.log(receipt)
  }

  handleInput = bytecode => {
    console.log(bytecode)
    console.log(`bytecode received -- hash ${hashBytecode(bytecode)}`)
    this.setState({ bytecode })
  }

  render() {
    const { loading, votesNeeded, receipt } = this.state
    const { classes } = this.props
    return (
      <Grid container alignItems="center" justify="center">
        <Box
          className={classes.box}
          color="white"
          bgcolor="#C0C0C0"
          border={1}
          fontFamily="Monospace"
          borderRadius={16}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column">
            <Grid item>
              <Typography variant="h3" className={classes.header}>
                CONTRACT PAYLOAD
              </Typography>
            </Grid>
            <Grid item className={classes.inputBox}>
              <SolInput onSubmit={this.handleInput} />
            </Grid>
            {receipt ? `Executed!` : votesNeeded ? `${votesNeeded} Votes Needed` : loading ? <CircularProgress /> : ''}
            <Grid
              container
              alignItems="center"
              justify="space-between"
              direction="row"
              className={classes.buttonContainer}>
              <Button
                disabled={this.state.bytecode == ''}
                className={classes.buttons}
                variant="contained"
                color="primary"
                onClick={this.checkVote}>
                Check Status
              </Button>
              <Button
                disabled={this.state.bytecode == ''}
                className={classes.buttons}
                variant="contained"
                color="primary"
                onClick={this.placeVote}>
                Vote!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/wallet/vote')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WalletVoting))
