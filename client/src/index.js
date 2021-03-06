import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.js';
// import Login from './pages/Login.js'
// import SignUp from './pages/SignUp.js';
// import DashBoard from './pages/DashBoard.js';
import reportWebVitals from './reportWebVitals';
import store from './state/store'

const AppWrapper = () => {
  return (<Provider store={store}></Provider>);
}

ReactDOM.render(
  <React.StrictMode>
    {/* <AppWrapper> */}
      <App />
    {/* </AppWrapper> */}
   </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
