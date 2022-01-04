import React, { useEffect, useState } from 'react'
import './Home.css'
import Post from './Post';
// import {Avatar} from '@material-ui/core'
import {FiLogOut} from 'react-icons/fi'
import { useStateValue } from '../../context/StateProvider';
import { SET_POSTS, SET_USER } from '../../context/action.types';
import axios from 'axios';
import Nsfw from './Nsfw';
import Pusher from 'pusher-js';
import { GoPrimitiveDot } from 'react-icons/go/'

const Home = () => {
const [{user,posts},dispatch] = useStateValue();
const [inputData, setInputData] = useState('');
// console.log('posts',posts);
  
  
const fetchPosts = async () => {
await axios.get('/api/v1/image')
.then((response => {
// console.log(response)
dispatch({
type: SET_POSTS,
posts: response.data
})


}))

}
  
useEffect(() => {
const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_SECRET}`, {
cluster: 'ap2'
});

const channel = pusher.subscribe('posts');
channel.bind('inserted', function (data) {
// alert(JSON.stringify(data));
// console.log(data);
fetchPosts();
});
return () => {
channel.unbind_all();
channel.unsubscribe();
}

}, []);

useEffect(() => {

fetchPosts()
}, []);


  const sendPost = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/v1/image-url', {
    inputs: inputData,
    })
    setInputData('');
    if (data) {
      // console.log(data)
      axios.post('/api/v1/image', {
        full_name: user.toUpperCase(),
        image: inputData,
        predicted_concepts: data.name,
        probability: data.value.toFixed(2) * 100 + '%'



      })
    }
  
} catch (error) {
  console.log(error.message);
}

} 

const signOut = ()=>{
if(user){
dispatch({
type: SET_USER,
user: null
})
sessionStorage.removeItem('userData')
}
}
return (

<div className = 'home'>
<div className="input__header">
<div className="input__profile">
<div className='input__profileIcon' >{ user[0] }</div>
<GoPrimitiveDot className='user__activeSign' />

<h3>Hello, { user  }  </h3>


</div>

<div onClick = {signOut} className="input__logout">

<FiLogOut className = 'input__logoutIcon'  /> 
<h3>Sign Out</h3>
</div>

</div>
<div className="input__container">
<form onSubmit={sendPost}>
<input type="text"
value = {inputData}
onChange = {e=> setInputData(e.target.value)}
placeholder = 'Paste URL of the image you want to test'
/>
</form>
</div>

{posts.map((post) => {

// console.log(post)


{
return (post.predicted_concepts === 'nsfw' && post?.probability >= '0.50' )? (
<Nsfw
key={post?.id}
full_name = {post?.full_name}
value={post?.probability}
name={post?.predicted_concepts}
/>

): (
<Post
key={post?.id}
full_name={post?.full_name}

image = {post?.image}
value = {post?.probability}
name = {post?.predicted_concepts}
/>     
)

}


})} 

</div>
)
}


export default Home
