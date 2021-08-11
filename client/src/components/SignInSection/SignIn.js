import React, { useState } from 'react'
import './SignIn.css'
import { MdEmail, MdLock, MdCheckCircle } from 'react-icons/md/';
import { useStateValue } from '../../context/StateProvider';
import { SET_USER } from '../../context/action.types';
import { Link } from 'react-router-dom';
const SignIn = () => {
const [{user}, dispatch] = useStateValue();

const [signInEmail, setSignInEmail] = useState('');
const [signInPwd, setSignInPwd] = useState('');

const onSubmitSignIn = (e) => {
fetch(`${process.env.REACT_APP_ROUTES}/signIn`, {
method: 'post',
headers: {
'Content-Type': 'application/json',

},
body: JSON.stringify({
email: signInEmail,
password: signInPwd
})
})
.then(res => res.json())
.then(data => {
const { email } = data;

// console.log('data',data);
if (data.id) {
dispatch({
type: 'SET_USER',
user: data
})
sessionStorage.setItem('userData', JSON.stringify(email.substring(0,email.lastIndexOf('@')).toUpperCase() ));

}
else {
alert('No user found ')
}
}).catch(error=> alert('something went wrong'))
e.preventDefault();


}
return (
<div className='login'>
<div className='login__container'>
<h1>Sign In</h1>

<form onSubmit = {onSubmitSignIn}>

<label htmlFor='Email'>Email</label>
<span className='login__formData'>
<MdEmail className='login__formDataIcons' />

<input 
value = {signInEmail}
onChange={(e) => setSignInEmail(e.target.value)}


type='email' id='Email' placeholder=' Email'
required
/>
</span>
<label htmlFor='Password'>Password</label>
<span className='login__formData'>
<MdLock className='login__formDataIcons' />
<input
value = {signInPwd}
onChange = {(e)=> setSignInPwd(e.target.value)}
type='password'
name='password'
id='Password'
placeholder='Password'
minLength = '6'
/>
</span>
<div className='login__btn'>

<button 

className='login__submit' type='submit'>
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

