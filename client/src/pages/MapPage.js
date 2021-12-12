import React, { memo } from 'react';

import { MapChart } from "../components/map"
import { Navigation } from "../components/navigation";
import ReactTooltip from "react-tooltip";

import { get_parks } from '../fetcher'


  class MapPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        st:"",
        number:"",
        num_new:"",
        content:""
    }

    this.setContent = this.setContent.bind(this)
    }

    setContent(state_name) {
      this.setState({ st: state_name })
      get_parks(this.state.st).then(res => {
        this.setState({ number: res.results })

        this.state.number.forEach((item, i) => {
          this.setState({ num_new: item.num})
          
      })

      this.setState({ content: this.state.st+" - "+this.state.num_new});
    


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