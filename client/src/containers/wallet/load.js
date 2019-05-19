import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'

import { loadWallet } from '../../actions/wallet'

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
    width: 400
  },
  input: {
    marginTop: 5,
    fontFamily: 'Monospace',
    fontSize: 18,
    width: 400
  },
  buttonWrapper: {}
})

class WalletLoader extends Component {
  state = {
    address: ''
  }

  handleChange = e => {
    this.setState({ address: e.target.value })
  }

  handleSubmit = async () => {
    const { loadWallet } = this.props
    console.log(this.state.address)
    loadWallet(this.state.address)
  }

  componentWillUpdate = nextProps => nextProps.wallet && this.props.changePage()

  renderLoading = () => <CircularProgress color="secondary" />

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
                  Enter DAO Address
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
                direction="column"
                alignItems="center">
                <div className={classes.textfieldWrapper}>
                  <TextField
                    label="Address"
                    value={this.state.address}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </div>
                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.input}
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleSubmit()}>
                    Load!
                  </Button>
                </div>
              </Grid>
            </Grid>
          )}
        </div>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ wallet }) => ({
  isLoading: wallet.loadPending,
  wallet: wallet.wallet
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWallet,
      changePage: () => push('/wallet/vote')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WalletLoader))
