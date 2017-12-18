import React, {Component} from 'react';

export default class FilterControls extends Component {

  render(){
    return(
      <div className='filter-controls'>
        <input onChange={this.props.handleFilterChange} placeholder='Filter by topping...' />
        <button onClick={this.props.handleFilterSort}>Sort</button>
      </div>
    )
  }
}
