import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import CurrentUserContext from './contexts/current-user/current-user.context';

/* We will need the constructor to set the state of the CurrentUser
We have to leverage the use of the consumer for useContext in order to consume it. In this case
we have to use the Provider, because here we don't have an access to a Hook to make it easier.
If we don't add the Provider, a lower component, like /shop, would go up to search for the provider
and since there isn't any, it would only use the initial state of the currentUser - null. */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      // When the currentUser logs out
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  // Our Header component is probably the place where we will need more of the CurrentUser context.
  // Also, the Header is available on every page of the app, so we will get the user for every page.
  // We get the user above and then we pass it in our provider as the value!
  // Remember that it needs to be consumed by the Header component below...
  render() {
    return (
      <div>
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header />
      </CurrentUserContext.Provider>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.state.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// mapStateToProps and mapDispatch to props are not needed anymore because the use o context.

export default App;
