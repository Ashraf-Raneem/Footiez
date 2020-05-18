import React,{createContext} from 'react'
import {auth} from '../../firebase/firebase.utils'

export const UserContext = createContext({user : null})

class UserProvider extends React.Component {
    state =  {
        user : null
    }


componentDidMount = () => {
auth.onAuthStateChanged(userAuth => {
    this.setState({user : userAuth})
})
}
render () {
    return (
        <UserProvider.Provider value={this.state.user}>
            {this.props.children}
        </UserProvider.Provider>
    )
}
}
export default UserProvider