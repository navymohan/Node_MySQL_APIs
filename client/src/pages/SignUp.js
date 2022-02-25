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
	// const [nameExists, setNameExists] = useState();
	// const [classExists, setClassExists] = useState();
	// const [mobNoExists, setMobNoExists] = useState();
	// const [emailExists, setEmailExists] = useState();
	// const [dobExists, setDobExists] = useState();
	// const [passwordExists, setPasswordExists] = useState();
	const [password, setPassword] = useState("");

    // let checkVariable = false;
	let nameExists = false, classExists = false, mobNoExists = false, emailExists = false,
		passwordExists = false, dobExists = false;

	let regexForemail = /^([a-z\d\.-]+)@([a-z]+)\.([a-z]{2,5})(\.[a-z]{2,8})?$/;
	let regexForMobileNumber = /^[6789]\d{9}$/;
	let regexForDOB = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/;
	let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&]).{8,16}$/;

	function nameValidation(){
		if(!s_name){
			// alert('Please enter you name');
			nameExists = false;
			// setNameExists(false);
		}
		else{
			console.log("in else");
			nameExists = true;
			// setNameExists(true);
			console.log(nameExists);
		}
	}

	function classValidation(){
		if(!s_class){
			// alert('Please enter you class');
			classExists = false;
			// setClassExists(false);
		}
		else{
			classExists = true;
			// setClassExists(true);
		}
	}
	
	function mobNoValidation(){
		if(!regexForMobileNumber.test(mobNo) || !mobNo){
			alert("Mobile number not in correct format");
			mobNoExists = false;
			// setMobNoExists(false);
		}
		else{
			mobNoExists = true;
			// setMobNoExists(true);
		}
	}

	function emailValidation(){
		if(!regexForemail.test(email) || !email){
			alert("Email not in correct format");
			emailExists = false;
			// setEmailExists(false);
		}
		else{
			emailExists = true;
			// setEmailExists(true);
		}
	}

	function passwordValidation(){
		if(!regexForPassword.test(password) || !password){
			alert("Password not in correct format.")
			passwordExists = false;
			// setPasswordExists(false);
		}
		else{
			passwordExists = true;
			// setPasswordExists(true);
		}
	}

	function dobValidation(){
		if(!regexForDOB.test(DOB) || !DOB){
			alert("DOB not in correct format.")
			dobExists = false;
			// setDobExists(false);
		}
		else{
			dobExists = true;
			// setDobExists(true);
		}
	}

	const signUpUser = () => {
		nameValidation();
		classValidation();
		mobNoValidation();
		passwordValidation();
		emailValidation();
		dobValidation();
		if(nameExists && classExists && mobNoExists && emailExists && dobExists && passwordExists){
		// if(nameExists){
			axios.post("http://localhost:3002/students/signUp", {
				s_name: s_name,
				s_class: s_class,
				mobNo: mobNo,
				email: email, 
				DOB: DOB,
				password: password
			}).then((response) => {
				console.log(response);
				if(response.data.status === false){
					console.log("Email already exists.");
					alert("This email already exists. Either login to your existing account or choose a new email.");
					props.history.push("/");
				}
				else{
					console.log("success", response.data.token);
					localStorage.setItem('token', response.data.token);
					props.history.push('/dashBoard');
				}
			})
		}
		else{
			console.log(nameExists, classExists, emailExists, mobNoExists, dobExists, passwordExists);
			alert("Please enter data in all the fields.");
		}
		// props.history.push('/dashBoard');
	}

	const loginHandler = () => {
		props.history.push('/login');
	}

    return (
        <div className="App">
            <div className="studentData">
                <label>Name: </label>
                <input className='name' type="text" onChange={(event) => {
                    setName(event.target.value)
                }} onBlur={nameValidation}
                />
                <label>Class: </label>
                <input type="text" onChange={(event) => {
                    setClass(event.target.value)
                }} onBlur={classValidation}
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
                <button className='submitButton' onClick={signUpUser}>SUBMIT</button>
				<button className='login' onClick={loginHandler}>LOGIN</button>
                {/* localStorage.setItem('token', ) */}
				{/* <p>
					{}
				</p> */}
            </div>
        </div>
    );
}

export default SignUp;