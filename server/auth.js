const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  

  // get token from the header

  const { token } = req.headers;
  // const token = req.header();

  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'No token, authrization denied' })
  }
  return next();
  
}
//   try {
//     const decoded = jwt.verify(token, process.env.jwtSecret);

//         req.headers.token = decoded.headers.token;
// // console.log(req)
// }
  //  catch (error) {
  //   res.status(401).json({message: 'token is not valid'})
  // }
// }