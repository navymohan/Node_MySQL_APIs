import '../App.css';
import {useState} from 'react'
import axios from 'axios';

function Login(props) {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    let regexForemail = /^([a-z\d\.-]+)@([a-z]+)\.([a-z]{2,5})(\.[a-z]{2,8})?$/;
	// let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&]).{8,16}$/;

    let emailExists = false, passwordExists = false;

    var emailCnt = 0;
    function emailValidation(){
        var emailError = document.getElementById('emailError');
		if(!regexForemail.test(email) || !email){
            if(emailCnt === 0){
			    // alert("Email not in correct format");
                emailError.textContent = "Email not in correct format"
                emailError.style.color = 'red';
                emailCnt += 1;
            }
            emailExists = false;
		}
        else{
            emailError.textContent = "";
            emailError.style.color = 'red';
            emailExists = true;
        }
	}

    // function passwordValidation(){
	// 	if(!regexForPassword.test(password)){
	// 		alert("Password not in correct format.");
    //         passwordExists = false;
	// 	}
    //     else{
    //         passwordExists = true;
    //     }
	// }

    const loginUser = () => {
        emailValidation();
        passwordExists = true;
        if(emailExists && passwordExists){
            axios.post("http://localhost:3002/students/login", {
                email: email,
                password: password
            }).then((response) => {
                if(response.data.token === undefined){
                    // alert("Invalid email or password");
                    var afterSubmit = document.getElementById("afterSubmit");
                    afterSubmit.textContent = "Please fill correct credentials.";
                    afterSubmit.style.color = 'red';
                    // If invalid match then again route to login page
                    props.history.push("/login");
                }
                else{
                    console.log("success", response.data.token);
                    localStorage.setItem('token', response.data.token);
                    // If correct information then route to dashBoard
                    props.history.push("/dashBoard");
                }
            })
        }
        else{
            console.log(emailExists, passwordExists);
            // if(!emailCnt){
                // alert("Please fill all the fields.");
            // var afterSubmit = document.getElementById("afterSubmit");
            // afterSubmit.textContent = "Please fill all the fields.";
            // afterSubmit.style.color = 'red';
            // }
        }
	}

    return (
        <div className='App'>
            <div className='studentData'>
                <label>Email: </label>
                <input type="email" onChange={(event) => {
                    setEmail(event.target.value)
                }} 
                onBlur={emailValidation}
                />
                <div id = 'emailError'></div>
                <label>Password: </label>
                <input type="password" onChange={(event) => {
                    setPassword(event.target.value)
                }}
                />
                <button className='submitButton' onClick={loginUser}>SUBMIT</button>
                <div id='afterSubmit'></div>
            </div>
        </div>
    )
}

export default Login;