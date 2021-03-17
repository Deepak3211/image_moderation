const handleRegister = (req, res, pool, bcrypt) => {
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
      await client.query('SELECT * FROM users WHERE email= $1',[email], (err, data) => {
    //  console.log(data.rows[0]);
    res.status(200).json(data.rows[0])
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
