import React from 'react';
import { Form, FormInput, FormGroup, FormSelect, Button} from "shards-react";

import { Navigation } from "../components/navigation";
import { TrailsTable } from "../components/trailsTable";

import { park_feature, park_activity } from '../fetcher'

import {
    Divider,

} from 'antd'


class TrailsPage extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          parkName: "Acadia National Park",
          featureName: "beach",
          activityName: "backpacking",
          trailsResults: [],
          rows: [],
      }

      this.handleParkNameChange = this.handleParkNameChange.bind(this)
      this.handleFeatureNameChange = this.handleFeatureNameChange.bind(this)
      this.handleActivityNameChange = this.handleFeatureNameChange.bind(this)
      this.updateFeatureSearch = this.updateFeatureSearch.bind(this)
      this.updateActivitySearch = this.updateActivitySearch.bind(this)

  }


  handleParkNameChange(event) {
    this.setState({ parkName: event.target.value })
  }

  handleFeatureNameChange(event) {
    this.setState({ featureName: event.target.value })
  }

  handleActivityNameChange(event) {
    this.setState({ activityName: event.target.value })
  }

  updateFeatureSearch() {
      park_feature(this.state.parkName, this.state.featureName).then(res => {
          this.setState({ trailsResults: res.results })
          this.setState({ rows: []});

          this.state.trailsResults.forEach((item, i) => {
            const ele = {id: i, trail_name: item.trail_name, park_name: item.park_name};
            this.setState({ rows: [...this.state.rows, ele]})
        });
      })
    
  }

  updateActivitySearch() {
    park_activity(this.state.parkName, this.state.activityName).then(res => {
        this.setState({ trailsResults: res.results })
        this.setState({ rows: []});

        this.state.trailsResults.forEach((item, i) => {
          const ele = {id: i, trail_name: item.trail_name, park_name: item.park_name};
          this.setState({ rows: [...this.state.rows, ele]})
      });
    })
  
}

  componentDidMount() {
    //   park_feature(this.state.parkName, this.state.featureName).then(res => {
    //       this.setState({ trailsResults: res.results })
    //   })

  }

  render() {
      return (
          <div>
              <Navigation />
              <Form style={{ width: '80vw', margin: '0 auto', marginTop: '10vh' }}>
                    <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Park</label>
                        <FormSelect onChange={this.handleParkNameChange}>
                        <option value="Acadia National Park">Acadia National Park</option>
                        <option value="Arches National Park">Arches National Park</option>
                        <option value="Badlands National Park">Badlands National Park</option>
                        <option value="Big Bend National Park">Big Bend National Park</option>
                        <option value="Biscayne National Park">Biscayne National Park</option>
                        <option value="Black Canyon of the Gunnison National Park">Black Canyon of the Gunnison National Park</option>
                        <option value="Bryce Canyon National Park">Bryce Canyon National Park</option>
                        <option value="Canyonlands National Park">Canyonlands National Park</option>
                        <option value="Capitol Reef National Park">Capitol Reef National Park</option>
                        <option value="Carlsbad Caverns National Park">Carlsbad Caverns National Park</option>
                        <option value="Channel Islands National Park">Channel Islands National Park</option>
                        <option value="Congaree National Park">Congaree National Park</option>
                        <option value="Crater Lake National Park">Crater Lake National Park</option>
                        <option value="Cuyahoga Valley National Park">Cuyahoga Valley National Park</option>
                        <option value="Death Valley National Park">Death Valley National Park</option>
                        <option value="Denali National Park and Preserve">Denali National Park and Preserve</option>
                        <option value="Dry Tortugas National Park">Dry Tortugas National Park</option>
                        <option value="Everglades National Park">Everglades National Park</option>
                        <option value="Gates Of The Arctic National Park and Preserve">Gates Of The Arctic National Park and Preserve</option>
                        <option value="Glacier Bay National Park and Preserve">Glacier Bay National Park and Preserve</option>
                        <option value="Glacier National Park">Glacier National Park</option>
                        <option value="Grand Canyon National Park">Grand Canyon National Park</option>
                        <option value="Grand Teton National Park">Grand Teton National Park</option>
                        <option value="Great Basin National Park">Great Basin National Park</option>
                        <option value="Great Sand Dunes National Park and Preserve">Great Sand Dunes National Park and Preserve</option>
                        <option value="Great Smoky Mountains National Park">Great Smoky Mountains National Park</option>
                        <option value="Guadalupe Mountains National Park">Guadalupe Mountains National Park</option>
                        <option value="Haleakala National Park">Haleakala National Park</option>
                        <option value="Hawaii Volcanoes National Park">Hawaii Volcanoes National Park</option>
                        <option value="Hot Springs National Park">Hot Springs National Park</option>
                        <option value="Isle Royale National Park">Isle Royale National Park</option>
                        <option value="Joshua Tree National Park">Joshua Tree National Park</option>
                        <option value="Katmai National Park and Preserve">Katmai National Park and Preserve</option>
                        <option value="Kenai Fjords National Park">Kenai Fjords National Park</option>
                        <option value="Kobuk Valley National Park">Kobuk Valley National Park</option>
                        <option value="Lake Clark National Park and Preserve">Lake Clark National Park and Preserve</option>
                        <option value="Lassen Volcanic National Park">Lassen Volcanic National Park</option>
                        <option value="Mammoth Cave National Park">Mammoth Cave National Park</option>
                        <option value="Mesa Verde National Park">Mesa Verde National Park</option>
                        <option value="Mount Rainier National Park">Mount Rainier National Park</option>
                        <option value="North Cascades National Park">North Cascades National Park</option>
                        <option value="Olympic National Park">Olympic National Park</option>
                        <option value="Petrified Forest National Park">Petrified Forest National Park</option>
                        <option value="Pinnacles National Park">Pinnacles National Park</option>
                        <option value="Redwood National Park">Redwood National Park</option>
                        <option value="Rocky Mountain National Park">Rocky Mountain National Park</option>
                        <option value="Saguaro National Park">Saguaro National Park</option>
                        <option value="Sequoia and Kings Canyon National Parks">Sequoia and Kings Canyon National Parks</option>
                        <option value="Shenandoah National Park">Shenandoah National Park</option>
                        <option value="Theodore Roosevelt National Park">Theodore Roosevelt National Park</option>
                        <option value="Voyageurs National Park">Voyageurs National Park</option>
                        <option value="Wind Cave National Park">Wind Cave National Park</option>
                        <option value="Wrangell - St Elias National Park and Preserve">Wrangell - St Elias National Park and Preserve</option>
                        <option value="Yellowstone National Park">Yellowstone National Park</option>
                        <option value="Yosemite National Park">Yosemite National Park</option>
                        <option value="Zion National Park">Zion National Park</option>
                        </FormSelect>

                        <label>Feature</label>

                        <FormSelect onChange={this.handleFeatureNameChange}>
                        <option value="beach">beach</option>
                        <option value="cave">cave</option>
                        <option value="city-walk">city-walk</option>
                        <option value="dogs">dogs</option>
                        <option value="dogs-leash">dogs-leash</option>
                        <option value="dogs-no">dogs-no</option>
                        <option value="forest">forest</option>
                        <option value="historic-site">historic-site</option>
                        <option value="hot-springs">hot-springs</option>
                        <option value="kids">kids</option>
                        <option value="lake">lake</option>
                        <option value="partially-paved">partially-paved</option>
                        <option value="paved">paved</option>
                        <option value="rails-trails">rails-trails</option>
                        <option value="river">river</option>
                        <option value="strollers">strollers</option>
                        <option value="views">views</option>
                        <option value="waterfall">waterfall</option>
                        <option value="wild-flowers">wild-flowers</option>
                        <option value="wildlife">wildlife</option>
                        </FormSelect>

                        <label>Activity</label>

                        <FormSelect onChange={this.handleActivityNameChange}>
                        <option value="backpacking">backpacking</option>
                        <option value="bike-touring">bike-touring</option>
                        <option value="birding">birding</option>
                        <option value="camping">camping</option>
                        <option value="canoeing">canoeing</option>
                        <option value="cross-country-skiing">cross-country-skiing</option>
                        <option value="fishing">fishing</option>
                        <option value="fly-fishing">fly-fishing</option>
                        <option value="hiking">hiking</option>
                        <option value="horseback-riding">horseback-riding</option>
                        <option value="ice-climbing">ice-climbing</option>
                        <option value="mountain-biking">mountain-biking</option>
                        <option value="nature-trips">nature-trips</option>
                        <option value="off-road-driving">off-road-driving</option>
                        <option value="paddle-sports">paddle-sports</option>
                        <option value="rails-trails">rails-trails</option>
                        <option value="road-biking">road-biking</option>
                        <option value="rock-climbing">rock-climbing</option>
                        <option value="scenic-driving">scenic-driving</option>
                        <option value="sea-kayaking">sea-kayaking</option>
                        <option value="skiing">skiing</option>
                        <option value="snowboarding">snowboarding</option>
                        <option value="snowshoeing">snowshoeing</option>
                        <option value="surfing">surfing</option>
                        <option value="trail-running">trail-running</option>
                        <option value="walking">walking</option>
                        <option value="whitewater-kayaking">whitewater-kayaking</option>
                        </FormSelect>
                    

                        <Button style={{ marginLeft: '2vh', marginTop: '2vh', display: 'inline-block'}} onClick={this.updateFeatureSearch}>Search Feature</Button>
                        <Button style={{ marginLeft: '2vh', marginTop: '2vh', display: 'inline-block'}} onClick={this.updateActivitySearch}>Search Activity</Button>

                    </FormGroup>
              </Form>
              <Divider />
              <TrailsTable rows={this.state.rows}/>
          </div>
      )
  }
}

export default TrailsPage