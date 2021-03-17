import React, { useState ,useEffect} from 'react'
import './Register.css'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdLock, MdCheckCircle } from 'react-icons/md/';
import { useStateValue } from '../../context/StateProvider';
import { SET_USER } from '../../context/action.types';
import { Link } from 'react-router-dom';
const Register = () => {
	const [{ user }, dispatch] = useStateValue();

	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPwd, setUserPwd] = useState('');
	const register =  (e) => {
	fetch(`${process.env.REACT_APP_ROUTES}/register`,{
		method: 'post',
		headers:{
			'Content-Type': 'application/json',

		},
		body: JSON.stringify({
			full_name: userName,
			email: userEmail,
			password: userPwd
		}),
	})
	.then(res=> res.json())
	.then(userData=>{
		if(userData.id){
			dispatch({
				type: SET_USER,
				user: userData
			})
			sessionStorage.setItem('userData', JSON.stringify(userData));
		}
		else{
			dispatch({
				type: SET_USER,
				user: null
			});
		}
	})
	.catch(error=> alert(error.message))

		e.preventDefault();

	}
  return (
		
		<div className='register'>
			<div className='register__container'>
				<h1>Create Account</h1>

				<form>
					<label htmlFor='name'>Full Name</label>
					<span className='register__formData'>
						<BsFillPersonFill className='register__formDataIcons' />
						<input type='text' placeholder='Full Name' id='name'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							required minLength="2" maxLength="30"
							/>
							
					</span>
					<label htmlFor='Email'>Email</label>
					<span className='register__formData'>
						<MdEmail className='register__formDataIcons' />

						<input type='email' id='Email' placeholder=' Email' 
							value = {userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
							required

						/>
					</span>
					<label htmlFor='Password'>Password</label>
					<span className='register__formData'>
						<MdLock className='register__formDataIcons' />
						<input
							onChange={(e) => setUserPwd(e.target.value )}
							value = {userPwd}
						  type='password'
							name='password'
							id='Password'
							placeholder='Password'
							minLength = '6'
							required
						/>
					</span>
				<div className='register__btn'>
					<span className='register__terms'>
						<MdCheckCircle className='register__formDataIcons' />
						<p>
							I've read and agree to <strong>Terms & Conditions </strong>
						</p>
					</span>
					<button
						onClick = {register}
						className='register__submit' type='submit'>
						Create Account
					</button>

					<p>
						Already have an account ?<Link to = '/signIn' ><strong>Sign In</strong> </Link>
					</p>
				</div>
							</form>
			</div>
		</div>
	);
}

export default Register
