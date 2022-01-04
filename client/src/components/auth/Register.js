import React, { useState } from 'react'
import './auth.css'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdLock, MdCheckCircle } from 'react-icons/md/';
import { useStateValue } from '../../context/StateProvider';
import { SET_USER } from '../../context/action.types';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
const [{ user }, dispatch] = useStateValue();
// console.log('user',user);
const [userName, setUserName] = useState('');
const [userEmail, setUserEmail] = useState('');
const [userPwd, setUserPwd] = useState('');

const register = async (e) => {
e.preventDefault();
try {
const { data } = await axios.post('/api/v1/register', {
full_name: userName,
email: userEmail,
password: userPwd

})
// console.log(data,)
const { id,full_name } = data;
if(id){
dispatch({
type: SET_USER,
user: full_name,
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
Already have an account ? <Link to = '/signIn' className = 'link'><strong >Sign In</strong> </Link>
</p>
</div>
</form>
</div>
</div>
);
}

export default Register
