import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import { createWallet } from '../../actions/wallet'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  wrapper: {
    padding: 24
  },
  title: {
    fontFamily: 'Monospace',
    fontSize: 24
  },
  header: {
    marginBottom: 10
  },
  contentWrapper: {
    margin: '30px 0'
  },
  textfieldWrapper: {
    width: 400,
    marginBottom: 5
  },
  input: {
    fontFamily: 'Monospace',
    fontSize: 18
  }
})

class WalletMaker extends Component {
  state = {
    addresses: [],
    inputValue: '',
    numSigs: ''
  }

  handleChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleChangeSigs = e => {
    this.setState({ numSigs: e.target.value })
  }

  handleKeyDown = e => {
    if (e.charCode == 13) {
      const newAddress = this.state.inputValue
      const addresses = [...this.state.addresses, newAddress]
      this.setState({ addresses, inputValue: '' })
    }
  }

  removeAddress = i => {
    let addresses = []
    addresses = addresses
      .concat(this.state.addresses.slice(0, i))
      .concat(this.state.addresses.slice(i + 1))
      .map(a => a.trim())
    this.setState({ addresses })
  }

  componentWillUpdate = nextProps => nextProps.wallet && this.props.changePage()

  renderList = () => (
    <List>
      <ListItem key={0}>
        <ListItemText primary={this.props.account} />
      </ListItem>

      {this.state.addresses.map((address, i) => (
        <ListItem key={i + 1}>
          <ListItemText primary={address} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete"
              onClick={() => this.removeAddress(i)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )

  handleSubmit = async () => {
    const { account, createWallet } = this.props
    const addresses = [account, ...this.state.addresses].map(a => a.trim())
    const sigs = this.state.numSigs
    createWallet(addresses, sigs)
  }

  renderLoading = () => {
    const { classes } = this.props
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.loader}>
        <CircularProgress color="secondary" size={100} />
      </Grid>
    )
  }

  render() {
    const { classes, changePage, isLoading, wallet } = this.props
    return (
      <Dialog className={classes.modal} open={true}>
        <div className={classes.wrapper}>
          {isLoading ? (
            this.renderLoading()
          ) : (
            <Grid container justify="space-between">
              <Grid item className={classes.header}>
                <Typography className={classes.title}>
                  Enter DAO members
                </Typography>
              </Grid>
              <Link to="/">
                <Button>
                  <CloseIcon className={classes.closeIcon} />
                </Button>
              </Link>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column">
                <div className={classes.textfieldWrapper}>
                  <TextField
                    label="Address"
                    className={classes.input}
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyDown}
                    fullWidth
                  />
                </div>
                <div className={classes.textfieldWrapper}>
                  <TextField
                    label="# Required Signatures"
                    className={classes.input}
                    onChange={this.handleChangeSigs}
                    value={this.numSigs}
                    fullWidth
                  />
                </div>
                {this.renderList()}
                <Button
                  className={classes.input}
                  variant="contained"
                  color="primary"
                  disabled={this.state.numSigs < 1}
                  onClick={() => this.handleSubmit()}>
                  Create!
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ web3, wallet }) => ({
  account: web3.accounts[0],
  isLoading: wallet.createPending,
  wallet: wallet.wallet
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createWallet,
      changePage: () => push('/wallet/vote')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WalletMaker))
