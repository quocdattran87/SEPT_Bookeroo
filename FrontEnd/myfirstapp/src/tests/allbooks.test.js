import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllBooks from '../components/UserManagement/Profile/Admin/AllBooks'

Enzyme.configure({ adapter: new Adapter() })

describe('<AllBooks /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false
    }
    it('should render 1 <AllBooks /> component', () => {
        const component = shallow(<AllBooks {...props}/>)
        expect(component).toHaveLength(1)
    })
})