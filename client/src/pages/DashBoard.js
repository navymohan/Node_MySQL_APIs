import '../App.css';
import { useState } from 'react';
import axios from 'axios';
// import React from 'react';


function DashBoard(props) {

    const [details, setDetails] = useState();
    const getDetails = () => {
        axios.get(`http://localhost:3002/students/${localStorage.getItem('token')}`).then((response)=> {
            // console.log("success", response);
            setDetails(response);
            console.log(details);
        }).catch((e) => {
        	console.log(e);
        })
        console.log(localStorage.getItem('token'));
    }

    const logOut = () => {
        localStorage.removeItem('token');
        props.history.push("/login");
    }

    return (
        <div className='dashBoard'>
            <button className='getDetails' onClick={getDetails}>Get your details</button>
            <table>
                <tr>
                    <td>{details && details.data.data.s_id}</td>
                </tr>
                <tr>
                    <td>{details && details.data.data.s_name}</td>
                </tr>
                <tr>
                    <td>{details && details.data.data.s_class}</td>
                </tr>
                <tr>
                    <td>{details && details.data.data.mobNo}</td>
                </tr>
                <tr>
                    <td>{details && details.data.data.email}</td>
                </tr>
                <tr>
                    <td>{details && details.data.data.DOB}</td>
                </tr>
            </table>
            <button className='logOut' onClick={logOut}>Log Out</button>
        </div>
    );
}

export default DashBoard;