import React, {Component} from 'react';
import {expect} from 'code';
import Enzyme, {shallow} from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';

import Adapter from 'enzyme-adapter-react-15.4';
Enzyme.configure({ adapter: new Adapter() });

import App, {fetchData, BASE_URL} from './../src/js/App'
import LoadSpinner from './../src/js/LoadSpinner';
import FilterList from './../src/js/FilterList';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  it('should render <App>', () => {
    expect(<App/>).to.exist();
  });

  it('should render a <LoadSpinner>', () => {
    expect(wrapper.containsAllMatchingElements([<LoadSpinner/>])).to.equal(true);
  });

  it('should call `fetchData` on component mount', async () => {

    const fetchData = sinon.stub().resolves({data:[]});
    const wrapper = await shallow(<App fetchData = {fetchData} />)
    expect(fetchData.calledOnce).to.be.true
  })

  it('should set component state to returned data', async () => {
    const dummyData = [
      "Sausage",
      "Cheese"
    ]

    const fetchData = sinon.stub().resolves({data:{pizzas:dummyData}})
    const wrapper = await shallow(<App fetchData = {fetchData} />)

    expect(wrapper.state('loaded')).to.be.true
    expect(wrapper.state('pizzas')).to.equal(dummyData)
  })

  it('calls the posts endpoint', () => {

    sinon.stub(axios,'get')
    fetchData()
    expect(axios.get.firstCall.args[0]).to.equal(BASE_URL)
    axios.get.restore()
  })

  it('should render the main screen elements if state is loaded', async () => {
    const wrapperWithState = shallow(<App/>);
    wrapperWithState.setState({
      loaded:true
    })

    expect(wrapperWithState.state('loaded')).to.be.true
    expect(wrapper.containsAllMatchingElements([<header/>,<footer/>,<FilterList/>])).to.be.true;
  });
});