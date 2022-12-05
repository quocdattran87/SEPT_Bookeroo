import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllAccounts from '../components/UserManagement/Profile/Admin/AllAccounts'

Enzyme.configure({ adapter: new Adapter() })

describe('<AllAccounts /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false
    }
    it('should render 1 <AllAccounts /> component', () => {
        const component = shallow(<AllAccounts {...props}/>)
        expect(component).toHaveLength(1)
    })
})