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
import FilterControls from './../src/js/FilterControls';
import FlipMove from 'react-flip-move';

describe('FilterList', () => {

  let wrapper;

  beforeEach(() => {

    wrapper = shallow(<FilterList/>);

  })

  it('should render', () => {

    expect(<FilterList/>).to.exist();

  })

  it('should contain <FilterControls and an unordered list', () => {

    expect(wrapper.find('FilterControls')).to.have.length(1);
    expect(wrapper.find('FlipMovePropConverter')).to.have.length(1);

  });

  it('should have no filter in the state to start', () => {

    expect(wrapper.state().currentFilter).to.equal(undefined)

  })

  it('should have a default sort order in the state', () => {

    expect(wrapper.state().sortOrder).to.equal('ASC')

  })

  it('should toggle the sortOrder when handleFilterSort is called', async () => {

    const wrapper = await shallow(<FilterList/>)
    wrapper.instance().handleFilterSort()
    expect(wrapper.state().sortOrder).to.equal('DESC')

  });

  it('should update the currentFilter when handleFilterChange is called', async () => {

    const wrapper = await shallow(<FilterList/>)
    wrapper.instance().handleFilterChange({currentTarget: {value:'blah'}})
    expect(wrapper.state().currentFilter).to.equal('blah')

  });

  it('should update the filteredList when handleFilterChange is called', async () => {

    const wrapper = await shallow(<FilterList list={['sausage','cheese']}/>)
    wrapper.instance().handleFilterChange({currentTarget: {value:'ee'}})
    expect(wrapper.state().filteredList[0]).to.equal('cheese')

  });

  describe('when data is loaded', () => {

    let wrapper;

    beforeEach(()=> {
      wrapper = shallow(<FilterList list={['sausage','cheese','3 cheese']}/>)
    })

    it('should render each list item passed in through props', () => {

      expect(wrapper.find('li')).to.have.length(3);

    })

    it('should initially sort the list alphabetically', ()=> {
      expect(wrapper.state().fullSortedList[0])
      .to.equal('3 cheese')
    })

    it('should should set filteredList to the fullSortedList', () => {

      expect(wrapper.state().filteredList)
      .to.equal(wrapper.state().filteredList)

    })

    it('should render list item values into children', () => {
      console.log('test: ', wrapper.find('li').first().text())

      expect(wrapper.find('li').first().text()).to.equal('3 cheese');

    });

    it('rendered items should mimic filteredList state', () => {

      expect(wrapper.find('li').first().text()).to.equal(wrapper.state().filteredList[0]);

    });

    it('should display the matched items in reverse order when the sortOrder is set to DESC', async () => {

      wrapper.setState({sortOrder: 'DESC'})
      expect(await wrapper.find('li').first().text()).to.equal('sausage')

    });

  })

})