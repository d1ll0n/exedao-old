import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import payloadTemplate from '../sol/contracts/payloadTemplate';
import easySolc from '../sol/easy-solc'

export default class SolInput extends Component {
    state = {
        value: ''
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleSubmit = () => {
        const {bytecode} = easySolc('Payload', payloadTemplate.replace('PUT_CODE_HERE', this.state.value))
        this.props.onSubmit(bytecode);
    }

    render = () => <div>
        <TextField multiline={true} style={{ width: '500px', height: '250px'}} value={this.state.value} onChange={this.handleChange} />
        <Button onClick={this.handleSubmit}>Compile!</Button>
    </div>
}