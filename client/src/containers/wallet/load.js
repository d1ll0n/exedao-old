import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
<<<<<<< HEAD
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
=======
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
>>>>>>> e3f85a0ed4fb90a1babc6e6f942317c3fbd73dc0

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
<<<<<<< HEAD
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
=======
    modal: {
      top: '2%',
      left: '2%',
      width: '96%',
      height: '96%'
    },
    paper: {
      position: 'absolute',
      width: '80%',
      outline: 'none',
      backgroundColor: 'lightgrey',
      paddingLeft: '20%'
    },
    input: {
        width: '60%',
    },
    button: {
      height: 75,
      fontFamily: 'Monospace',
      fontSize: 18,
      bottom: 0
    },
  });
  
>>>>>>> e3f85a0ed4fb90a1babc6e6f942317c3fbd73dc0

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

<<<<<<< HEAD
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
                  Enter Wallet Owners
                </Typography>
              </Grid>
              <Button>
                <CloseIcon className={classes.closeIcon} />
              </Button>
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
=======
    render() {
        const {classes, changePage, isLoading, wallet} = this.props;
        return <Modal className={classes.modal} open={true}>
            <Grid container alignItems='center' justify='center'>
            {
            isLoading
                ? this.renderLoading()
                : <div style={getModalStyle()} className={classes.paper}>
                    <TextField
                    placeholder="0x00d5fb51216ba19236554a9f0f80da76b5c4ab8e"
                    className={classes.input}
                    value={this.state.address}
                    onChange={this.handleChange}
                    />
                    <Link to="/">
                        <Button
                        variant="contained"
                        color="warning"
                        className={classes.button}>
                        Cancel
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.handleSubmit()}>
                        Create!
                    </Button>
                </div>
        }            
            </Grid>
        </Modal>
    }
>>>>>>> e3f85a0ed4fb90a1babc6e6f942317c3fbd73dc0
}

const mapStateToProps = ({ wallet }) => ({
  isLoading: wallet.loadPending,
  wallet: wallet.wallet
})

<<<<<<< HEAD
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWallet,
      changePage: () => push('/')
    },
    dispatch
  )
=======
const mapDispatchToProps = dispatch => bindActionCreators({
    loadWallet,
    changePage: () => push('/wallet/vote')
}, dispatch)
>>>>>>> e3f85a0ed4fb90a1babc6e6f942317c3fbd73dc0

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WalletLoader))
