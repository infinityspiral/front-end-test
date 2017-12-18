import React, {Component} from 'react';
import FilterControls from "./FilterControls";
import FlipMove from 'react-flip-move';

export default class FilterList extends Component {

  state = {
    fullSortedList: this.sortListAlphabetically([...this.props.list]),
    filteredList: this.sortListAlphabetically([...this.props.list]),
    sortOrder: 'ASC'
  }

  sortListAlphabetically(arr){
    return arr.sort((a,b) => a > b ? 1 : -1);
  }

  handleFilterChange = (e) => {
    const filterRX = new RegExp(e.currentTarget.value,'i')
    const matchedArr = [...this.state.fullSortedList].filter(item => item.match(filterRX))
    this.setState({
      filteredList: matchedArr,
      currentFilter: e.currentTarget.value
    })
  }

  handleFilterSort = () => {
    this.setState({
      sortOrder: ((this.state.sortOrder === 'ASC') ? 'DESC' : 'ASC')
    })
  }

  renderArrayToElements = (arr) => {
    return arr.map(item => <li key={item}>{item}</li>)
  }

  displayOrderedMatchingElements = (arr) => {
    const matchedArr = [...arr];
    if(this.state.sortOrder === 'DESC') {
      matchedArr.reverse();
    }

    return this.renderArrayToElements(matchedArr)
  }

  render(){

    return(
      <div className='filter-list'>
        <FilterControls
          handleFilterChange={this.handleFilterChange}
          handleFilterSort={this.handleFilterSort}
        />
        {/*<ul>{this.displayOrderedMatchingElements(this.state.filteredList)}</ul>*/}

        <FlipMove
          typeName='ul'
          duration={100}
          easing='ease-out'
          staggerDurationBy={65}
          enterAnimation='elevator'
        >
          {this.displayOrderedMatchingElements(this.state.filteredList)}
        </FlipMove>
      </div>
    )
  }
}
FilterList.defaultProps = {
  list:[],
}
