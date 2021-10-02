import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import Signin from './components/Welcome/signin'
// import RouterComponent from './Router';

const App = () => {
  // Import the page you are working on and comment the others to test

  return (
    // <Provider store={store} >
    //   <RouterComponent />
    // </Provider>
    <React.Fragment>
    <Signin/>
    </React.Fragment>
  );
};

export default App;
