import React, { useState } from 'react'
import './auth.css'
import { MdEmail, MdLock } from 'react-icons/md/';
import { useStateValue } from '../../context/StateProvider';
// import { SET_USER } from '../../context/action.types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SET_USER } from '../../context/action.types';
const SignIn = () => {
const [{user}, dispatch] = useStateValue();

const [userEmail, setUserEmail] = useState('');
const [userPassword, setUserPassword] = useState('');

const onSubmitSignIn = async (e) => {
e.preventDefault();
try {
const { data } = await axios.post('/api/v1/login', {
email: userEmail,
password: userPassword

})
// console.log(data,)
const {  id,full_name } = data;
if(id){
dispatch({
type: SET_USER,
user: full_name
})

sessionStorage.setItem('userData', JSON.stringify(full_name ));

}
else{
dispatch({
type: SET_USER,
user: null
});
}
} catch (error) {
console.log(error.message);
}}
return (
<div className='register'>
<div className='register__container'>
<h1>Sign In</h1>

<form onSubmit = {onSubmitSignIn}>

<label htmlFor='Email'>Email</label>
<span className='register__formData'>
<MdEmail className='register__formDataIcons' />

<input 
value = {userEmail}
onChange={(e) => setUserEmail(e.target.value)}


type='email' id='Email' placeholder=' Email'
required
/>
</span>
<label htmlFor='Password'>Password</label>
<span className='register__formData'>
<MdLock className='register__formDataIcons' />
<input
value = {userPassword}
onChange = {(e)=> setUserPassword(e.target.value)}
type='password'
name='password'
id='Password'
placeholder='Password'
minLength = '6'
/>
</span>
<div className='register__btn'>

<button 

className='register__submit' type='submit'>
Sign In
</button>

<p>
Don't have an account ? <Link to ='/register' className = 'link'> <strong>Sign Up</strong></Link>
</p>
</div>
</form>
</div>
</div>
);
}

export default SignIn;

