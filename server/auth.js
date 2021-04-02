const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  

  // get token from the header

  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({message: 'No token, authorization denied'})
  }
  try {
    const decoed = jwt.verify(authorization, process.env.jwtSecret);

    req.user = decoed.user;
    next();
  } catch (error) {
    res.status(401).json({message: 'token is not valid'})
  }
}