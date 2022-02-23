import '../App.css';
import {useState} from 'react'
import axios from 'axios';

function Login(props) {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    let regexForemail = /^([a-z\d\.-]+)@([a-z]+)\.([a-z]{2,5})(\.[a-z]{2,8})?$/;
	let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&]).{8,16}$/;

    let checkVariable = false;

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

    const loginUser = () => {
		axios.post("http://localhost:3002/students/login", {
			email: email,
			password: password
		}).then((response) => {
			console.log("success", response.data.token);
			localStorage.setItem('token', response.data.token);
		})
        props.history.push("/dashBoard");
	}

    return (
        <div className='App'>
            <div className='studentData'>
                <label>Email: </label>
                <input type="email" onChange={(event) => {
                    setEmail(event.target.value)
                }} onBlur={emailValidation}
                />
                <label>Password: </label>
                <input type="password" onChange={(event) => {
                    setPassword(event.target.value)
                }} onBlur = {passwordValidation}
                />
                <button className='submitButton' onClick={loginUser}>SUBMIT</button>
            </div>
        </div>
    )
}

export default Login;