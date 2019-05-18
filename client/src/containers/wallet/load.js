import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import {loadWallet} from '../../actions/wallet';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    modal: {
        top: '2%',
        left: '2%',
        width: '96%'
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
    }
  });
  

class WalletLoader extends Component {
    state = {
        address: ''
    }

    handleChange = (e) => {
        this.setState({ address: e.target.value })
    }

    handleSubmit = async () => {
        const {loadWallet} = this.props;
        console.log(this.state.address)
        loadWallet(this.state.address);
    }

    componentWillUpdate = (nextProps) => nextProps.wallet && this.props.changePage()

    renderLoading = () => <CircularProgress color="secondary" />

    render() {
        const {classes, changePage, isLoading, wallet} = this.props;
        return <Modal className={classes.modal} open={true}>
            {
                isLoading
                ? this.renderLoading()
                : <div style={getModalStyle()} className={classes.paper}>
                    <TextField
                        placeholder="0x00d5fb51216ba19236554a9f0f80da76b5c4ab8e"
                        className={classes.input}
                        value={this.state.address}
                        onChange={this.handleChange} />
                    <Button className={classes.input} onClick={() => this.handleSubmit()}>Load!</Button>
                </div>
            }            
        </Modal>
    }
}

const mapStateToProps = ({ wallet }) => ({
    isLoading: wallet.loadPending,
    wallet: wallet.wallet
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadWallet,
    changePage: () => push('/')
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WalletLoader))