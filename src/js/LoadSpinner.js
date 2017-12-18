import React, {Component} from 'react';

class LoadSpinner extends Component {
  render(){
    return (
      <div className='loader'>
        <div className='loading-icon'></div>
        <div className='loading-text'>Loading...</div>
      </div>
    )
  }
}
export default LoadSpinner;