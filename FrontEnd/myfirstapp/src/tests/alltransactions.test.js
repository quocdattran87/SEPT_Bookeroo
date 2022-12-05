import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllTransactions from '../components/UserManagement/Profile/Admin/AllTransactions'

Enzyme.configure({ adapter: new Adapter() })

describe('<AllTransactions /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false
    }
    it('should render 1 <AllTransactions /> component', () => {
        const component = shallow(<AllTransactions {...props}/>)
        expect(component).toHaveLength(1)
    })
})