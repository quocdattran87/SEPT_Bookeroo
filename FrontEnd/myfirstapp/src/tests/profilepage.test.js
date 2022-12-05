import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProfilePage from '../components/UserManagement/Profile/ProfilePage'

Enzyme.configure({ adapter: new Adapter() })

describe('<ProfilePage /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false
    }
    it('should render 1 <ProfilePage /> component', () => {
        const component = shallow(<ProfilePage {...props}/>)
        expect(component).toHaveLength(1)
    })
})