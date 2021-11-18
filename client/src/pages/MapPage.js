import React from 'react';

import MenuBar from '../components/MenuBar';
import { Button } from "shards-react";

import { num_trails_state, get_parks } from '../fetcher'

class MapPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      text1: '',
      text2: ''
    }

    this.handleButtonChange_num_trails_state = this.handleButtonChange_num_trails_state.bind(this)
    this.handleButtonChange_parks_in_state = this.handleButtonChange_parks_in_state.bind(this)


  }

  handleButtonChange_num_trails_state() {

    num_trails_state("Washington").then(res => {
      // console.log(res.results )
      this.setState({ text1: JSON.stringify(res.results)}) })
  }

  handleButtonChange_parks_in_state() {

    get_parks("WA").then(res => {
      // console.log(res.results )
      this.setState({ text2: JSON.stringify(res.results )})
    })
  }

  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Map</h3>
          <Button variant="primary" onClick={this.handleButtonChange_num_trails_state} >num_trails_state</Button >
          <h5>{this.state.text1}</h5>
          <Button variant="primary" onClick={this.handleButtonChange_parks_in_state} >parks_in_state</Button >
          <h5>{this.state.text2}</h5>
        </div>
      </div>
    )
  }

}

export default MapPage