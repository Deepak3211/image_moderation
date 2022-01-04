const express = require('express');
require('dotenv').config()
const cors = require('cors');
const userRouter = require('./routes/authRoutes')
// const image = require('./controllers/posts');
const postRouter = require('./routes/postRoutes')
const path = require('path');


const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;




/** @routes
 *  */
app.use('/api/v1', userRouter)
app.use('/api/v1', postRouter)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'../client/build','index.html'));
  })
}
/** @server is listening 
 * 
*/

app.listen(PORT,()=>{
console.log(`App is running on port ${PORT} `);
})