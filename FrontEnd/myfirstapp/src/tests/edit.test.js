import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Edit from '../components/UserManagement/Profile/Edit'


Enzyme.configure({ adapter: new Adapter() })

describe('<Edit /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false
    }
    it('should render 1 <Edit /> component', () => {
        const component = shallow(<Edit {...props}/>)
        expect(component).toHaveLength(1)
    })
})