const handleRegister = (req, res, pool, bcrypt,jwt) => {
  const { email, full_name, password } = req.body;
  if (!email || !full_name || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  
  
  ;(async () => {

    const client = await pool.connect();
    const hash = bcrypt.hashSync(password, (saltRounds = 10));
    const joined = new Date();
    try {
      await client.query('BEGIN')
      const loginData = 'INSERT INTO login(email,hash,joined) VALUES($1,$2,$3) RETURNING id'
      await client.query(loginData, [ email,hash,joined])
      const userData = 'INSERT INTO users(full_name,email,joined) VALUES ($1,$2,$3)'
      // const userDataRes = await client.query('SELECT * FROM users')
      // res.status(200).json(userDataRes.rows[0])
      // console.log(userDataRes.rows[0]);

      await client.query(userData, [
        full_name,
        email,
        joined
         
      ])
      await client.query('SELECT * FROM users WHERE email= $1',[email], (err, user) => {
        //  console.log(data.rows[0]);
        // res.status(200).json(data.rows[0])
        
        console.log(user.rows[0]);
        const userData = user.rows[0]
        jwt.sign({id:userData.id,full_name:userData.full_name,email:userData.email}, process.env.jwtSecret, {
          expiresIn: 3600
        }, (err, token) => {
          if (err) {
            throw err;
          }
          res.status(201).json({id:userData.id,email:userData.email,token})
        })
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
  module.exports = {
    handleRegister
  }
