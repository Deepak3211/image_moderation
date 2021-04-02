const handleSignIn =(req,res,pool,bcrypt,jwt)=>{
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
        // console.log(user.rows[0]);
       const userData = user.rows[0]
        jwt.sign({id:userData.id,email:userData.email}, process.env.jwtSecret, {
          expiresIn: 3600
        }, (err, token) => {
          if (err) {
            throw err;
          }
          res.status(200).json({id:userData.id,email:userData.email,token})
        })
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
  handleSignIn
}