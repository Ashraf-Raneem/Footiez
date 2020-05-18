import React from 'react'
import './header.styles.css'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {Navbar, NavbarBrand,NavItem,Nav,} from 'reactstrap'
import { auth } from '../../firebase/firebase.utils'
const Header = (props) => {
    return (
        <div>
            <Navbar className='headerDiv'>
                <NavbarBrand >Footiez</NavbarBrand>
                <Nav>
                    <NavItem>{props.currentUser ? 
                        <div className='navLink' onClick={() => auth.signOut()}>
                            Sign Out
                        </div>
                        :
                        <Link to ='/' className='navLink'>Sign In</Link>
                    }
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  });
  
  export default connect(mapStateToProps)(Header);