import '../App.css';
import {useState} from 'react'
import axios from 'axios';
import React from 'react';

function SignUp(props) {
	const [s_name, setName] = useState("");
	const [s_class, setClass] = useState("");
	const [mobNo, setMob] = useState("");
	const [email, setEmail] = useState("");
	const [DOB, setDob] = useState();
	const [password, setPassword] = useState("");

	let nameExists = false, classExists = false, mobNoExists = false, emailExists = false,
		passwordExists = false, dobExists = false;

	let regexForemail = /^([a-z\d\.-]+)@([a-z]+)\.([a-z]{2,5})(\.[a-z]{2,8})?$/;
	let regexForMobileNumber = /^[6789]\d{9}$/;
	let regexForDOB = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/;
	let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&]).{8,16}$/;

	var nameCnt = 0;
	function nameValidation(){
		var nameError = document.getElementById('nameError');
		if(!s_name){
			if(nameCnt === 0){
				nameError.textContent = "Please enter you name.";
				nameError.style.color = 'red';
				nameCnt += 1;
				// alert('Please enter you name');
			}
			nameExists = false;
		}
		else{
			nameError.textContent = "";
			nameError.style.color = 'red';
			nameExists = true;
		}
	}

	var classCnt = 0;
	function classValidation(){
		var classError = document.getElementById('classError');
		if(!s_class){
			if(classCnt === 0){
				classError.textContent = "Please enter your class.";
				classError.style.color = 'red';
				// alert('Please enter you class');
			}
			classExists = false;
		}
		else{
			classError.textContent = "";
			classExists = true;
		}
	}
	
	var mobCnt = 0;
	function mobNoValidation(){
		var mobNoError = document.getElementById('mobNoError');
		if(!regexForMobileNumber.test(mobNo) || !mobNo){
			if(mobCnt === 0){
				mobNoError.textContent = "Mobile number not in correct format";
				mobNoError.style.color = 'red';
				// alert("Mobile number not in correct format");
				mobCnt += 1;
			}
			mobNoExists = false;
		}
		else{
			mobNoError.textContent = "";
			mobNoExists = true;
		}
	}

	var emailCnt = 0;
	function emailValidation(){
		var emailError = document.getElementById('emailError');
		if(!regexForemail.test(email) || !email){
			if(emailCnt === 0){
				emailError.textContent = "Email not in correct format";
				emailError.style.color = 'red';
				// alert("Email not in correct format");
				emailCnt += 1;
			}
			emailExists = false;
		}
		else{
			emailError.textContent = "";
			emailExists = true;
		}
	}

	var passwordCnt = 0;
	function passwordValidation(){
		var passwordError = document.getElementById('passwordError');
		if(!regexForPassword.test(password) || !password){
			if(passwordCnt === 0){
				passwordError.textContent = "Password not in correct format.";
				passwordError.style.color = 'red';
				// alert("Password not in correct format.");
				passwordCnt += 1;
			}
			passwordExists = false;
		}
		else{
			passwordError.textContent = "";
			passwordExists = true;
		}
	}

	var dobCnt = 0;
	function dobValidation(){
		var dobError = document.getElementById('dobError');
		if(!regexForDOB.test(DOB) || !DOB){
			if(dobCnt === 0){
				dobError.textContent = "DOB not in correct format.";
				dobError.style.color = 'red';
				// alert("DOB not in correct format.");
				dobCnt += 1;
			}
			dobExists = false;
		}
		else{
			dobError.textContent = "";
			dobExists = true;
		}
	}

	function allCalls(){
		nameValidation();
		classValidation();
		mobNoValidation();
		passwordValidation();
		emailValidation();
		dobValidation();
	}

	const signUpUser = () => {
		allCalls();
		if(nameExists && classExists && mobNoExists && emailExists && dobExists && passwordExists){
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
			// if(!nameCnt && !mobCnt && !emailCnt && !dobCnt && !passwordCnt){
				// alert("Please fill all the fields.");
			var afterSubmit = document.getElementById("afterSubmit");
			afterSubmit.textContent = "Please fill all the fields.";
			afterSubmit.style.color = 'red';
			// }
		}
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
				<div id='nameError'></div>
                <label>Class: </label>
                <input type="text" onChange={(event) => {
                    setClass(event.target.value)
                }} onBlur={classValidation}
                />
				<div id='classError'></div>
                <label>MobNo: </label>
                <input type="text" onChange={(event) => {
                    setMob(event.target.value)
                }} onBlur={mobNoValidation}
                />
				<div id='mobNoError'></div>
                <label>Email: </label>
                <input type="email" onChange={(event) => {
                    setEmail(event.target.value)
                }} onBlur={emailValidation}
                />
				<div id='emailError'></div>
                <label>DOB: </label>
                <input type="text" onChange={(event) => {
                    setDob(event.target.value)
                }} onBlur = {dobValidation}
                />
				<div id='dobError'></div>
                <label>Password: </label>
                <input type="password" onChange={(event) => {
                    setPassword(event.target.value)
                }} onBlur = {passwordValidation}
                />
				<div id='passwordError'></div>
                <button className='submitButton' onClick={signUpUser}>SUBMIT</button>
				<div id='afterSubmit'></div>
				<button className='login' onClick={loginHandler}>LOGIN</button>
            </div>
        </div>
    );
}

export default SignUp;