import React, {Component} from 'react';
import axios from 'axios'
import LoadSpinner from './LoadSpinner';
import FilterList from './FilterList';

export const BASE_URL = '/pizza.json';

export const fetchData = () => {
  return axios.get(BASE_URL);
}

class App extends Component {

  state = {
    loaded: false,
    pizzas: []
  }

  componentDidMount () {
    this.props.fetchData()
    .then(res => {
      this.setState({
        pizzas: res.data.pizzas,
        loaded: true
      })

      document.querySelector('.filter-controls input').focus();
    })
  }

  render(){
    if(!this.state.loaded){
      return(
        <div className="app">
          <LoadSpinner/>
        </div>
      )
    } else {
      return(
        <div className="app">
          <header></header>
          <FilterList list={this.state.pizzas}/>
          <footer>3100 4th Ave # 200, East Moline, IL 61244</footer>
        </div>
      )
    }
  }
}
App.defaultProps = {
  fetchData
}

export default App;