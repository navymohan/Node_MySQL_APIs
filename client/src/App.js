import './App.css';
import {useState} from 'react'
import axios from 'axios';

function App() {
	const [formValue, setFormValue] = useState({
		s_name: '',
		s_class: '',
		mobNo: '',
		email: '',
		DOB: '',
		password: ''
	});

	const setChange = (event) => {
		setFormValue({
			...formValue,
			[event.target.name]: event.target.value
		})
	}

	const sendData = async() => {
		const filledData = new FormData();
		filledData.append("s_name", formValue.s_name)
		filledData.append("s_class", formValue.s_class)
		filledData.append("mobNo", formValue.mobNo)
		filledData.append("email", formValue.email)
		filledData.append("DOB", formValue.DOB)
		filledData.append("password", formValue.password)

		try {
			// making axios post request
			const response = await axios({
			  method: "post",
			  url: "/stduents/signUp",
			  data: filledData,
			//   headers: { "Content-Type": "multipart/form-data" },
			});
		} catch(error) {
			console.log(error)
		}
	}

  return (
    <div className="App">
		<div className='dataForm'>
			<form>
				<table>
					<tr>
						<th><label>Name: </label></th>
						<th><input 
								type="text"
								name='s_name'
								onChange={setChange}
							/>
						</th>
					</tr>
					<tr>
						<th><label>Class: </label></th>
						<th><input 
								type="text"
								name='s_class'
								onChange={setChange}
							/>
						</th>
					</tr>
					<tr>
						<th><label>MobNo: </label></th>
						<th><input 
								type="text"
								name='mobNo'
								onChange={setChange}
							/>
						</th>
					</tr>
					<tr>
						<th><label>Email: </label></th>
						<th><input 
								type='email'
								name='email'
								onChange={setChange}
							/>
						</th>
					</tr>
					<tr>
						<th><label>DOB: </label></th>
						<th><input 
								type='date'
								name='DOB'
								className='dob'
								onChange={setChange}
							/>
						</th>
					</tr>
					<tr>
						<th><label>Password: </label></th>
						<th><input 
								type='password'
								name='password'
								onChange={setChange}
							/>
						</th>
					</tr>
					{/* <tr>
						<th><label>Name: </label></th>
						<th><input 
								type="text"
								name='Name'
							/>
						</th>
					</tr> */}
				</table>
			</form>
		</div>
		<button type='submit' className="submitButton" onClick={sendData}>SUBMIT</button>
    </div>
  );
}

export default App;
