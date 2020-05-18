import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import SignInQuiz from './pages/signInPage/signIn.component'
import HomePage from './pages/HomePage/hompage.component'
import QuizPage from './pages/quizPage/quizPage.component'
import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import {Route,Switch, Redirect} from 'react-router-dom'
import {auth,createUserProfileDocument} from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions';
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              name : snapShot.name, 
              ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
      
    });
    
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
  return (
    <div>
      <Header></Header>
      <Switch>
      <Route exact path='/' render = {()=>this.props.currentUser ? (<Redirect to= '/homepage' ></Redirect>) : (<SignInQuiz></SignInQuiz>)}></Route>
      <Route exact path='/homepage' component={HomePage}></Route>
      <Route exact path='/quiz' component ={QuizPage}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
