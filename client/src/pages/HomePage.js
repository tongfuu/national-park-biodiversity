import React from 'react';

import MenuBar from '../components/MenuBar';
import { Button } from "shards-react";

import { welcome } from '../fetcher'

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      text: '',
    }

    this.handleButtonChange = this.handleButtonChange.bind(this)

  }

  handleButtonChange() {

    welcome().then(res => {
      // console.log(res.results )
      this.setState({ text: res.text })
    })
  }

  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Welcome</h3>
          <Button variant="primary" onClick={this.handleButtonChange} >Show</Button >
          <h5>{this.state.text}</h5>
        </div>
      </div>
    )
  }

}

export default HomePage

