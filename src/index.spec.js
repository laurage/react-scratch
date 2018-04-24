import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import App from './index'

configure({ adapter: new Adapter() })

const wrapper = shallow(<App />)

it('should render a `.colored`', () => {
  expect(wrapper.find('.colored')).to.have.length(1)
})
