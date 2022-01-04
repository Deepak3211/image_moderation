import './App.css'
import Home from './components/HomeSection/Home';
import { useStateValue } from './context/StateProvider'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register'
import Login from './components/auth/SignIn'
const App = () => {
const [{user}] = useStateValue();
return (
<Router>

<div className = 'app'>
{!user ? <div className = 'auth__container'>
<Link to='/register'>
<button className='authNav__signUp'>Register</button>
</Link>
<Link to='/signIn'>
<button className='authNav__signIn'>Sign In</button>
</Link>
</div>:

<>
{/* <Link to = '/'></Link> */}
<Redirect to = '/home' />

</>

}


<Switch>
{!user? <>
<Route path = '/register' exact component = {Register} />
<Route path = '/signIn' exact component = {Login} />
</>:<>
<Route path ='/home' exact component = {Home} />

</>}
</Switch>
</div>
</Router>
)
}

export default App
