import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import store from '../store'
import SignUpPage from '../components/UserManagement/SignUp/SignUpPage'

Enzyme.configure({ adapter: new Adapter() })

describe('<SignUpPage /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false,
        store: store
    }
    it('should render 1 <SignUpPage /> component', () => {
        const component = shallow(<SignUpPage {...props}/>)
        expect(component).toHaveLength(1)
    })
})