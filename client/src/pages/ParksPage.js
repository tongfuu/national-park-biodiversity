import React from 'react';

import MenuBar from '../components/MenuBar';

class ParksPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Parks</h3>
        </div>
      </div>
    )
  }

}

export default ParksPage