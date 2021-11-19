import React from 'react';

import { Navigation } from "../components/navigation";
import { Features } from "../components/features";
// import { Header } from "../components/header";

import JsonData from "../data/data.json";

// import { Button } from "shards-react";

// import { num_trails_state, get_parks } from '../fetcher'

// const App = () => {
//   const [landingPageData, setLandingPageData] = useState({});
//   useEffect(() => {
//     setLandingPageData(JsonData);
//   }, []);

//   return (
//     <div>
//       <Navigation />
//       <Header data={landingPageData.Header} />
//       <Features data={landingPageData.Features} />
//     </div>
//   );
// };

class MapPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      text1: '',
      text2: '',
      landingPageData: JsonData
    }

    // this.handleButtonChange_num_trails_state = this.handleButtonChange_num_trails_state.bind(this)
    // this.handleButtonChange_parks_in_state = this.handleButtonChange_parks_in_state.bind(this)


  }

  // handleButtonChange_num_trails_state() {

  //   num_trails_state("Washington").then(res => {
  //     // console.log(res.results )
  //     this.setState({ text1: JSON.stringify(res.results)}) })
  // }

  // handleButtonChange_parks_in_state() {

  //   get_parks("WA").then(res => {
  //     // console.log(res.results )
  //     this.setState({ text2: JSON.stringify(res.results )})
  //   })
  // }


  render() {

    return (
      <div>
        <Navigation />
        {/* <Features data={this.state.landingPageData.Features} /> */}
        <div style={{ marginTop: '10vh' }}>
        <Features data={this.state.landingPageData.Features} />
        </div>
        {/* <h5>MapPage</h5> */}
        {/* <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Map</h3>
          <Button variant="primary" onClick={this.handleButtonChange_num_trails_state} >num_trails_state</Button >
          <h5>{this.state.text1}</h5>
          <Button variant="primary" onClick={this.handleButtonChange_parks_in_state} >parks_in_state</Button >
          <h5>{this.state.text2}</h5>
        </div> */}
      </div>
    )
  }

}

export default MapPage