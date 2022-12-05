import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import store from '../store'
import SearchedBooks from '../components/BookManagement/SearchedBooks'

Enzyme.configure({ adapter: new Adapter() })

describe('<SearchedBooks /> component Unit Test', () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false,
        store: store
    }
    it('should render 1 <SearchedBooks /> component', () => {
        const component = shallow(<SearchedBooks {...props}/>)
        expect(component).toHaveLength(1)
    })
})