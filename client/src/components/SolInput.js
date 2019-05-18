import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import payloadTemplate from '../sol/contracts/payloadTemplate'
import easySolc from '../sol/easy-solc'

const styles = theme => ({
  button: {
    fontFamily: 'Monospace',
    fontSize: 18
  }
})

class SolInput extends Component {
  state = {
    value: ''
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = () => {
    const { bytecode } = easySolc(
      'Payload',
      payloadTemplate.replace('PUT_CODE_HERE', this.state.value)
    )
    this.props.onSubmit(bytecode)
  }

  render = () => (
    <Grid container direction="column">
      <TextField
        multiline={true}
        rows="10"
        label={'YOUR CONTRACT GOES HERE'}
        style={{ width: '500px', height: '250px' }}
        value={this.state.value}
        variant="outlined"
        onChange={this.handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ fontFamily: 'Monospace', fontSize: 18 }}
        onClick={this.handleSubmit}>
        Compile!
      </Button>
    </Grid>
  )
}

export default SolInput
