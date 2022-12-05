import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleBook from '../components/BookManagement/SingleBook'
import store from '../store'

Enzyme.configure({ adapter: new Adapter() })

describe('<SingleBook /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false,
        store: store
    }
    it('should render 1 <SingleBook /> component', () => {
        const component = shallow(<SingleBook {...props}/>)
        expect(component).toHaveLength(1)
    })
})