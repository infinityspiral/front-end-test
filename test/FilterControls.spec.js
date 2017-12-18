import React, {Component} from 'react';
import {expect} from 'code';
import Enzyme, {shallow} from 'enzyme';
import sinon, {spy, stub} from 'sinon';

import Adapter from 'enzyme-adapter-react-15.4';
Enzyme.configure({ adapter: new Adapter() });

import FilterControls from './../src/js/FilterControls';


describe('FilterControls', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FilterControls/>);
  })

  it('should render', () => {
    expect(wrapper).to.exist();
  })

  it('should contain an input and a button', () => {
    expect(wrapper.containsAllMatchingElements([
      <input/>,
      <button>Sort</button>
    ])).to.equal(true)
  })

  it('should call handFilterSort when sort button is clicked', () => {
    const filterSortSpy = sinon.spy();
    const wrapperWithProps = shallow(<FilterControls handleFilterSort={filterSortSpy}/>)
    const button = wrapperWithProps.find('button');
    button.simulate('click');
  });

  it('should call handFilterChange when input text is updated', () => {
    const filterSortSpy = sinon.spy();
    const wrapperWithProps = shallow(<FilterControls handleFilterChange={filterSortSpy}/>)
    const input = wrapperWithProps.find('input');
    input.simulate('change', 'test');
    expect(filterSortSpy.calledWith('test')).to.equal(true)
  });
})
