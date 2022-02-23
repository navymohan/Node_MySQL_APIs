import '../App.css';
// import {useState} from 'react'
import axios from 'axios';
// import React from 'react';
let details = null;

function DashBoard(props) {

    // let details = null;
    // function printdetails(){
    //     if(){

    //     }
    // }

    const getDetails = () => {
        axios.get(`http://localhost:3002/students/${localStorage.getItem('token')}`).then((response)=> {
            console.log("success", response);
            details = response;
        }).catch((e) => {
        	console.log(e);
        })
        console.log(localStorage.getItem('token'));
        // printdetails();
    }

    const logOut = () => {
        localStorage.removeItem('token');
        props.history.push("/");
    }

    return (
        <div className='dashBoard'>
            <button className='logOut' onClick={logOut}>Log Out</button>
            <button className='getDetails' onClick={getDetails}>Get your details</button>
        </div>
    );
}

export default DashBoard;