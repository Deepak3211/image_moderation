const bcrypt = require('bcrypt');
const pool = require('../db')

//Register User => /api/v1/register

const registerUser  =  (req, res) => {
const { email, full_name, password } = req.body;
// console.log(req.body)
if (!email || !full_name || !password) {
return res.status(400).json('Incorrect form submission');
}
if (!password || password.length < 6) {
return res.status(400).json({
message: 'Password must be at least 6 characters',
success: false
});
}


;(async () => {

const client = await pool.connect();
const hash = bcrypt.hashSync(password, (saltRounds = 10));
const joined = new Date();
try {
await client.query('BEGIN')
const loginData = 'INSERT INTO login(full_name,email,hash,joined) VALUES($1,$2,$3,$4) RETURNING id'
await client.query(loginData, [ full_name,email,hash,joined])
const userData = 'INSERT INTO users(full_name,email,joined) VALUES ($1,$2,$3)'
// const userDataRes = await client.query('SELECT * FROM users')
// res.status(200).json(userDataRes.rows[0])

// console.log('userDt',userData);
await client.query(userData, [
full_name,
email,
joined

])
await client.query('SELECT * FROM users WHERE email= $1',[email], (err, user) => {
//  console.log(data.rows[0]);
// res.status(200).json(data.rows[0])
if(err) return res.status(500).json(err.message);
// console.log(user.rows[0]);
  const userData = user.rows[0];
const { email, id,full_name } = userData;

 res.status(201).json({email,id,full_name})
// console.log(userData)
})

await client.query('COMMIT')

} catch (error) {
await client.query('ROLLBACK')

}
finally {
await  client.release()
}

})().catch(err => res.status(400).json('Unable to register'))

}



//Login User => /api/v1/login
const loginUser =(req,res)=>{
const {email,password} = req.body;
if(!email || !password){
return res.status(400).json('Wrong credentials');
}
  
  
pool.query('SELECT * FROM login WHERE email = $1',[email])
.then(data => {
// console.log(data.rows[0]);
const isValid = bcrypt.compareSync(password,data.rows[0].hash);
if(isValid){
return pool.query('SELECT * FROM users WHERE email = $1',[email])
.then(user=>{
// res.json(user.rows[0])
// console.log(user[0]);
// console.log(user.rows);
const userData = user.rows[0]
// console.log('userData', userData);
  const {email,id,full_name} = userData
res.status(200).json({email,id,full_name})
})

.catch(error=>res.status(400).json('Unable to get the user'))
}
else{
return res.status(400).json('Wrong Credentials')
}
})
.catch(error=> res.status(400).json('Wrong Credentials'))

}
module.exports = {
registerUser,
loginUser,
}
