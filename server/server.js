const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const pool = require('./db');
const register = require('./controllers/register')
const signIn = require('./controllers/signIn');
const image = require('./controllers/posts');
const Pusher = require('pusher');
const app = express();
app.use(cors());
app.use(express.json());


require('dotenv').config()
const PORT = process.env.PORT || 5050;

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true
});



pool.on('error', (err, client) => {
  console.log('Error', err);
});

/** @routes
 *  */


// register user

app.post('/register', (req,res)=>{
  
  register.handleRegister(req,res,pool,bcrypt)
  // res.status(200).json(req.body);
  // console.log(req.body);

})


//signIn
app.post('/signIn',(req,res)=>{
  signIn.handleSignIn(req,res,pool,bcrypt);
  // res.status(200).json(req.body);
  // res.status(200).json('😆')

})


// post

app.post('/imageUrl',(req,res)=>{
 image.handleApiCall(req,res)
//  res.status(200).json(req.body)
//  console.log(req);
})

app.post('/image',(req,res)=>{
  image.handlePost(req, res, pool);
  pusher.trigger("posts", "inserted", req.body);
  res.status(200).json(req.body);
})
// get all the posts

app.get('/image', (req, res) => {
  pool.query('SELECT * FROM posts ORDER BY posted DESC', (error, data) => {
    if (error) {
     res.status(404).json('Not Found')
    }
    else {
      // console.log(data.rows);
      res.status(200).json(data.rows);
    }
 })
})
/** @server is listening 
 * 
*/

app.listen(PORT,()=>{
  console.log(`App is running on ${PORT} Number`);
})