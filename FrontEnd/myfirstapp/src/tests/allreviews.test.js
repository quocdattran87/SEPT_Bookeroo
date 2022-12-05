import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllReviews from '../components/UserManagement/Profile/Admin/AllReviews'

Enzyme.configure({ adapter: new Adapter() })

describe('<AllReviews /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false
    }
    it('should render 1 <AllReviews /> component', () => {
        const component = shallow(<AllReviews {...props}/>)
        expect(component).toHaveLength(1)
    })
})