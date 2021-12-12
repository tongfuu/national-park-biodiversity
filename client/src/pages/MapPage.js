import React, { memo } from 'react';

import { MapChart } from "../components/map"
import { Navigation } from "../components/navigation";
import ReactTooltip from "react-tooltip";

import { get_parks } from '../fetcher'
import { num_trails_state } from '../fetcher'
import { get_common_animals } from '../fetcher'


  class MapPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        st:"",
        parks_new:"",
        parks:"",
        trail_new:"",
        trails:"",
        animals:"",
        animal1:"",
        animal2:"",
        animal3:""
    }

    this.setContent = this.setContent.bind(this)
    }

    setContent(state_name) {
      if(state_name!=""){

        this.setState({ st: state_name});


        get_parks(state_name).then(res => {
          this.setState({ parks_new: res.results[0].num}, () =>{
            this.setState({ parks: "# parks: "+ this.state.parks_new});
          }
          )
        })



        num_trails_state(state_name).then(res => {
          this.setState({ trail_new: res.results[0].numTrails}, () =>{
            this.setState({ trails: "# trails: " + this.state.trail_new});
          }
          )
        })




        get_common_animals(state_name).then(res => {

          this.setState({ animals: res.results })
          // console.log(this.state.animals)
          if(this.state.animals.length == 0){
            this.setState({animal1:""})
            this.setState({animal2:""})
            this.setState({animal3:""})
          }
          else if(this.state.animals.length == 1){
            this.setState({animal1:this.state.animals[0].names})
            this.setState({animal2:""})
            this.setState({animal3:""})
          }
          else if(this.state.animals.length == 2){
            this.setState({animal1:this.state.animals[0].names})
            this.setState({animal2:this.state.animals[1].names})
            this.setState({animal3:""})
          }
          else{
            this.setState({animal1:this.state.animals[0].names})
            this.setState({animal2:this.state.animals[1].names})
            this.setState({animal3:this.state.animals[2].names})
          }
          

        })


      }else{
        this.setState({ content: ""});
        this.setState({ trails: ""});
        this.setState({ animal1: ""});
        this.setState({ animal2: ""});
        this.setState({ animal3: ""});
      }



      
      
    }

  
    render() {
  
      return (
        <div>
          <Navigation />
          <MapChart setTooltipContent={this.setContent} />
          <ReactTooltip>
          <p>{this.state.st}</p>
          <p>{this.state.parks}</p>
          <p>{this.state.trails}</p>
          
          <ul>
            <li>{this.state.animal1}</li>
            <li>{this.state.animal2}</li>
            <li>{this.state.animal3}</li>
          </ul>
            
        

          
          </ReactTooltip>
        </div>


      )
    }
  
  }
  





export default MapPage;