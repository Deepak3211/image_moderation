const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const pool = require('../db')
const Pusher = require('pusher');
const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", process.env.API_KEY);

const pusher = new Pusher({
appId: process.env.PUSHER_APP_ID,
key: process.env.PUSHER_KEY,
secret: process.env.PUSHER_SECRET,
cluster: "ap2",
useTLS: true
});


// Send Image Data => /api/v1/image-url
const apiData = async (req,res)=>{

// console.log(req.body);

await stub.PostModelOutputs(
{
// This is the model ID of a publicly available General model. You may use any other public or custom model ID.
model_id: "e9576d86d2004ed1a38ba0cf39ecb4b1",
inputs: [{data:{image:{url:req.body.inputs}}}]
},
metadata,
(err, response) => {
if (err) {
console.log("Error: " + err);
return;
}

if (response.status.code !== 10000) {
console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
return;
}

// console.log("Predicted concepts, with confidence values:")
for (const c of response.outputs[0].data.concepts) {
// console.log( c);
return res.json(c) ;

}


}
)
}


// create post => /api/v1/createPost

const createPost = (req,res)=>{
const {full_name,image,predicted_concepts,probability} = req.body;
if(!image ){
return res.status(400).json('Please proive an image')
}
;(async ()=>{
const client = await pool.connect();
const posted = new Date();

try{

const postData = 'INSERT INTO posts(full_name,image,predicted_concepts,probability,posted) VALUES($1,$2,$3,$4,$5) RETURNING id';
  await client.query(postData, [full_name, image, predicted_concepts, probability, posted]);
  pusher.trigger("posts", "inserted", req.body);
  res.status(200).json(req.body);
// console.log(req.body);
}
catch(error){
throw error;

}
})().catch(e=> console.log('error occur'));
}

const getPostData = async (req, res) => {
try {
pool.query('SELECT * FROM posts ORDER BY posted DESC', (error, data) => {
if (error) return res.status(404).json('Not Found')
// console.log(data.rows);
 return res.status(200).json(data.rows);
})
} catch (error) {
  res.status(500).json({
    message: error.message,
    success: false
  });
}
}
module.exports = {
  apiData,
  createPost,
  getPostData

}