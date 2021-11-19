import React from 'react';
import { Form, FormInput, FormGroup, Button} from "shards-react";


import { Navigation } from "../components/navigation";

import { park_feature } from '../fetcher'

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

const { Column, ColumnGroup } = Table;

class TrailsPage extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          parkName: "",
          featureName: "",
          trailsResults: [],
      }


      this.handleParkNameChange = this.handleParkNameChange.bind(this)
      this.handleFeatureNameChange = this.handleFeatureNameChange.bind(this)
      this.updateSearchResults = this.updateSearchResults.bind(this)

  }


  handleParkNameChange(event) {
    this.setState({ parkName: event.target.value })
  }

  handleFeatureNameChange(event) {
    this.setState({ featureName: event.target.value })
  }

  updateSearchResults() {
      
      park_feature(this.state.parkName, this.state.featureName).then(res => {
          this.setState({ trailsResults: res.results })
      })
  }

  componentDidMount() {
      park_feature(this.state.parkName, this.state.featureName).then(res => {
          this.setState({ trailsResults: res.results })
      })

  }

  render() {
      return (
          <div>
              <Navigation />
              <Form style={{ width: '80vw', margin: '0 auto', marginTop: '10vh' }}>
                  <Row>
                      <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                          <label>Park</label>
                          <FormInput placeholder="Park" value={this.state.parkName} onChange={this.handleParkNameChange}/>
                      </FormGroup></Col>
                      <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                          <label>Feature</label>
                          <FormInput placeholder="Activity" value={this.state.featureName} onChange={this.handleFeatureNameChange}/>
                      </FormGroup></Col>
                      <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                          <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                      </FormGroup></Col>

                  </Row>


              </Form>
              <Divider />
              <Table dataSource={this.state.trailsResults} style={{ marginLeft: '20vh'}}>
                      <Column title="Trails" dataIndex="trail_name" key="trail_name"/>
              </Table>

          </div>
      )
  }
}

export default TrailsPage