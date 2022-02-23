import '../App.css';
// import {useState} from 'react'
import axios from 'axios';
// import React from 'react';

function DashBoard() {

    const getDetails = () => {
        axios.get(`http://localhost:3002/students/${localStorage.getItem('token')}`).then((response)=> {
            console.log("success", response);
        }).catch((e) => {
        	console.log(e);
        })
        console.log(localStorage.getItem('token'));
    }

    const logOut = () => {
        localStorage.removeItem('token');
    }

    return (
        <div className='dashBoard'>
            <button className='logOut' onClick={logOut}>Log Out</button>
            <button className='getDetails' onClick={getDetails}>Get your details</button>
        </div>
    );
}

export default DashBoard;