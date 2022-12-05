import React from 'react'
import App from '../App'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('<App /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false,
        text: "buy milk"
    }
    it('should render 1 <App /> component', () => {
        const component = mount(<App {...props}/>)
        expect(component).toHaveLength(1)
    })
})