import '../App.css';
import {useState} from 'react'
// import {useHistory} from 'react-router-dom'
import axios from 'axios';
import React from 'react';

function SignUp(props) {
    
	// let history = useHistory();
	const [s_name, setName] = useState("");
	const [s_class, setClass] = useState("");
	const [mobNo, setMob] = useState("");
	const [email, setEmail] = useState("");
	const [DOB, setDob] = useState();
	const [password, setPassword] = useState("");

    let checkVariable = false;

	let regexForemail = /^([a-z\d\.-]+)@([a-z]+)\.([a-z]{2,5})(\.[a-z]{2,8})?$/;
	let regexForMobileNumber = /^[6789]\d{9}$/;
	let regexForDOB = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/;
	let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&]).{8,16}$/;

	function mobNoValidation(){
		if(!regexForMobileNumber.test(mobNo)){
			alert("Mobile number not in correct format");
			checkVariable = true;
		}
	}

	function emailValidation(){
		if(!regexForemail.test(email)){
			alert("Email not in correct format");
			checkVariable = true;
		}
	}

	function passwordValidation(){
		if(!regexForPassword.test(password)){
			alert("Password not in correct format.")
			checkVariable = true;
		}
	}

	function dobValidation(){
		if(!regexForDOB.test(DOB)){
			alert("DOB not in correct format.")
			checkVariable = true;
		}
	}

	const signUpUser = () => {
		axios.post("http://localhost:3002/students/signUp", {
			s_name: s_name,
			s_class: s_class, 
			mobNo: mobNo, 
			email: email, 
			DOB: DOB, 
			password: password
		}).then((response) => {
			console.log("success", response.data.token);
			localStorage.setItem('token', response.data.token);
		})
		props.history.push('/dashBoard');


	}

    return (
        <div className="App">
            <div className="studentData">
                <label>Name: </label>
                <input type="text" onChange={(event) => {
                    setName(event.target.value)
                }}
                />
                <label>Class: </label>
                <input type="text" onChange={(event) => {
                    setClass(event.target.value)
                }}
                />
                <label>MobNo: </label>
                <input type="text" onChange={(event) => {
                    setMob(event.target.value)
                }} onBlur={mobNoValidation}
                />
                <label>Email: </label>
                <input type="email" onChange={(event) => {
                    setEmail(event.target.value)
                }} onBlur={emailValidation}
                />
                <label>DOB: </label>
                <input type="text" onChange={(event) => {
                    setDob(event.target.value)
                }} onBlur = {dobValidation}
                />
                <label>Password: </label>
                <input type="password" onChange={(event) => {
                    setPassword(event.target.value)
                }} onBlur = {passwordValidation}
                />
                <button className='submitButton' onClick={signUpUser} 
					// onClick={ () => {
					// history('/dashBoard');}
					// }
				>SUBMIT</button>
                {/* localStorage.setItem('token', ) */}
            </div>
        </div>
    );
}

export default SignUp;

// const SignUp = ()=>{
// 	return <h1>Hello World</h1>
// }

// export default SignUp;