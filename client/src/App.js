import './App.css';
// import {useState} from 'react'
// import axios from 'axios';
// import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignUp from "./pages/SignUp.js";
import DashBoard from "./pages/DashBoard.js";

function App() {
	return (
		<Router>
			<div className='App'>
			<Switch>
					<Route exact path="/" component = {SignUp}></Route>
					<Route exact path="/dashBoard" component = {DashBoard}></Route>
			</Switch>
			</div>
		</Router>
		// <>
		// <SignUp/></>
	);
}

export default App;