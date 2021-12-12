import React, { memo } from 'react';

import { MapChart } from "../components/map"
import { Navigation } from "../components/navigation";
import ReactTooltip from "react-tooltip";

import { get_parks } from '../fetcher'


  class MapPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        num_new:"",
        content:""
    }

    this.setContent = this.setContent.bind(this)
    }

    setContent(state_name) {
      get_parks(state_name).then(res => {
        this.setState({ num_new: res.results[0].num}, () =>{
          this.setState({ content: state_name + " - " + this.state.num_new});
        }
        )
      })
    }

  
    render() {
  
      return (
        <div>
          <Navigation />
          <MapChart setTooltipContent={this.setContent} />
          <ReactTooltip>{this.state.content}</ReactTooltip>
        </div>


      )
    }
  
  }
  





export default MapPage;