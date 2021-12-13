import React from 'react';
import { Form, FormInput, FormGroup, FormSelect, Button} from "shards-react";

import { Chart } from "react-google-charts";

import { Navigation } from "../components/navigation";
import { SpeciesTable } from "../components/speciesTable";

import { park_category, park_state, scientific_state, density_park } from '../fetcher'

import {
    Divider,

} from 'antd'

class SearchPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        parkName: "Acadia National Park",
        categoryName: "",
        stateName: "ME",
        searchResults: [],
        searchrows: [],
        scientific_name: "fox",
        scientificResults: [],
        scientificRows:  [['State', 'Number of Occurance', { role: 'style'}], ['CA', 65, '#015C92'], ['AK', 36, '#2D82B5'], ['UT', 34, '#54A6D8'], ['VA', 30, '#88CDF6'], ['CO', 26, '#BCE6FF']],
        densityParkName: "Acadia National Park",
        densityResults: [],
        densityRows:  [['Category', 'Density', { role: 'style'}], ['Vascular Plant', 0.0259, '#015C92'], ['Bird', 0.0077, '#2D82B5'], ['Mammal', 0.0012, '#54A6D8'], ['Fish', 0.0008, '#88CDF6'], ['Amphibian',0.0003, '#BCE6FF']],
        colors: ['#015C92', '#2D82B5', '#54A6D8', '#88CDF6', '#BCE6FF']

    }

    this.handleParkNameChange = this.handleParkNameChange.bind(this)
    this.handleCategoryNameChange = this.handleCategoryNameChange.bind(this)
    this.handleStateNameChange = this.handleStateNameChange.bind(this)
    this.handleScientificNameChange = this.handleScientificNameChange.bind(this)
    this.handleDensityParkNameChange = this.handleDensityParkNameChange.bind(this)
    this.updateCategorySearch = this.updateCategorySearch.bind(this)
    this.updateStateSearch = this.updateStateSearch.bind(this)
    this.updateScientificSearch = this.updateScientificSearch.bind(this)
    this.updateDensitySearch = this.updateDensitySearch.bind(this)
    }

    handleParkNameChange(event) {
      this.setState({ parkName: event.target.value })
    }
  
    handleCategoryNameChange(event) {
      this.setState({ categoryName: event.target.value })
    }
  
    handleStateNameChange(event) {
      this.setState({ stateName: event.target.value })
    }

    handleScientificNameChange(event) {
      this.setState({ scientific_name: event.target.value })
    }

    handleDensityParkNameChange(event) {
      this.setState({ densityParkName: event.target.value })
    }

    updateCategorySearch() {
      park_category(this.state.parkName, this.state.categoryName).then(res => {
          this.setState({ searchResults: res.results })
          this.setState({ searchrows: []});

          this.state.searchResults.forEach((item, i) => {
            const ele = {id: i, species_name: item.scientific_name};
            this.setState({ searchrows: [...this.state.searchrows, ele]})
        });
      })
    
    }

  updateStateSearch() {
    park_state(this.state.stateName).then(res => {
        this.setState({ searchResults: res.results })
        this.setState({ searchrows: []});

        this.state.searchResults.forEach((item, i) => {
          const ele = {id: i, species_name: item.scientific_name};
          this.setState({ searchrows: [...this.state.searchrows, ele]})
      });
    })
  }

  updateScientificSearch() {
    scientific_state(this.state.scientific_name).then(res => {
        this.setState({ scientificResults: res.results })
        this.setState({ scientificRows: [['State', 'Number of Occurance', { role: 'style'}]] })
        
        this.state.scientificResults.forEach((item, i) => {
          const ele = [item.state, parseInt(item.num), this.state.colors[i]];
          this.setState({ scientificRows: [...this.state.scientificRows, ele]})
      });
    }
    
    )
  }

  updateDensitySearch() {
    density_park(this.state.densityParkName).then(res => {
        this.setState({ densityResults: res.results })
        this.setState({ densityRows: [['Category', 'Density', { role: 'style'}]] })
        
        this.state.densityResults.forEach((item, i) => {
          const ele = [item.category, parseFloat(item.density)];
          console.log(item.speciesNum)
          this.setState({ densityRows: [...this.state.densityRows, ele]})
      });
    }
    
    )
  }


render() {
  return (
      <div>
          <Navigation />
          <div className="row">
            <div className='text-center' style={{padding: 100}}>
              <div className='col-md-10 col-md-offset-1 section-title'>
                <h2>Species Finder</h2>
                <h3>Do you want to know...</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-6" >
                <div className='text-center'>
                <h5>How many _____ in each state?</h5>
                </div>
                <Form style={{  width: '80vw', marginLeft: '15vw'}}>
                          <FormGroup style={{ width: '20vw' }}>
                              <label>Animal Name</label>
                              <FormInput value = {this.state.scientific_name} onChange={this.handleScientificNameChange} placeholder="scientific_name"/>
                              <Button style={{ marginLeft: '12vh', marginTop: '2vh', display: 'inline-block'}} onClick={this.updateScientificSearch}>Search</Button>

                          </FormGroup>
                </Form>

                  <Chart
                    width={'500px'}
                    height={'300px'}
                    style={{ marginTop: '2vh', margin: '0 auto'}}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={
                      this.state.scientificRows
                    }
                    options={{
                      title: 'Number of Occurances in Each State',
                      width: 600,
                      height: 400,
                      hAxis: {
                        minValue: 0,
                        maxValue: 100
                      },
                      animation: {
                        startup: true,
                        easing: 'linear',
                        duration: 1000,
                      },
                    }}
                  />


              </div>

              <div className="col-xs-12 col-md-6" >
                <div className='text-center'>
                <h5>For _____, how many unique species per acre per category?</h5>
                </div>
                <Form style={{  width: '80vw', marginLeft: '15vw'}}>
                          <FormGroup style={{ width: '20vw' }}>
                              <label>Park Name</label>
                              {/* <FormInput value = {this.state.scientific_name} onChange={this.handleScientificNameChange} placeholder="scientific_name"/> */}

                              <FormSelect onChange={this.handleDensityParkNameChange}>
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

                              <Button style={{ marginLeft: '12vh', marginTop: '2vh', display: 'inline-block'}} onClick={this.updateDensitySearch}>Search</Button>

                          </FormGroup>
                </Form>

                  <Chart
                    width={'500px'}
                    height={'300px'}
                    style={{ marginTop: '2vh', margin: '0 auto'}}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={
                      this.state.densityRows
                    }
                    options={{
                      title: 'Number of Unique Species Per Acre',
                      width: 600,
                      height: 400,
                      hAxis: {
                        minValue: 0,
                        maxValue: 0.04
                      },
                      animation: {
                        startup: true,
                        easing: 'linear',
                        duration: 1000,
                      }
                    }}
                  />


              </div>


            </div>
          </div>

          <div className='text-center' style={{ marginTop: '20vh'}}>
              <h3>Now, Search!</h3>
          </div>

          <Form style={{ width: '80vw', margin: '0 auto', marginTop: '4vh', background: '#f6f6f6' }}>
                <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                    <label style={{ marginTop: '15px'}}>Park</label>

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

                    <label>Category</label>

                    <FormSelect onChange={this.handleCategoryNameChange}>
                    <option value="">None</option>
                    <option value="Mammal">Mammal</option>
                    <option value="Bird">Bird</option>
                    <option value="Reptile">Reptile</option>
                    <option value="Amphibian">Amphibian</option>
                    <option value="Fish">Fish</option>
                    <option value="Vascular Plant">Vascular Plant</option>
                    <option value="Spider/Scorpion">Spider/Scorpion</option>
                    <option value="Insect">Insect</option>
                    <option value="Invertebrate">Invertebrate</option>
                    <option value="Fungi">Fungi</option>
                    <option value="Nonvascular Plant">Nonvascular Plant</option>
                    <option value="Crab/Lobster/Shrimp">Crab/Lobster/Shrimp</option>
                    <option value="Slug/Snail">Slug/Snail</option>
                    <option value="Algae">Algae</option>
                    </FormSelect>

                    <label>State</label>

                    <FormSelect onChange={this.handleStateNameChange}>
                    <option value="ME">ME</option>
                    <option value="UT">UT</option>
                    <option value="SD">SD</option>
                    <option value="TX">TX</option>
                    <option value="FL">FL</option>
                    <option value="CO">CO</option>
                    <option value="NM">NM</option>
                    <option value="CA">CA</option>
                    <option value="SC">SC</option>
                    <option value="OR">OR</option>
                    <option value="OH">OH</option>
                    <option value="AK">AK</option>
                    <option value="MT">MT</option>
                    <option value="AZ">AZ</option>
                    <option value="WY">WY</option>
                    <option value="NV">NV</option>
                    <option value="NC">NC</option>
                    <option value="HI">HI</option>
                    <option value="AR">AR</option>
                    <option value="MI">MI</option>
                    <option value="KY">KY</option>
                    <option value="WA">WA</option>
                    <option value="VA">VA</option>
                    <option value="ND">ND</option>
                    <option value="MN">MN</option>
                    </FormSelect>
                

                    <Button style={{ marginLeft: '2vh', marginTop: '2vh', display: 'inline-block'}} onClick={this.updateStateSearch}>Search State</Button>
                    <Button style={{ marginLeft: '2vh', marginTop: '2vh', display: 'inline-block'}} onClick={this.updateCategorySearch}>Search Category</Button>

                </FormGroup>
          </Form>

          <Divider />
          <SpeciesTable rows={this.state.searchrows}/>

      </div>
  )
}

}

export default SearchPage