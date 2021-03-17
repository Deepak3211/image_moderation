const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
require('dotenv').config()

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", process.env.API_KEY);
const handleApiCall = async (req,res)=>{

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
            
            console.log("Predicted concepts, with confidence values:")
            for (const c of response.outputs[0].data.concepts) {
                // console.log( c);
                return res.json(c) ;
                
            }
          
        
        }
        )
    }

    const handlePost = (req,res,database)=>{
        const {image,predicted_concepts,probability,post_date} = req.body;
        if(!image ){
            return res.status(400).json('Please proive an image')
        }

       
        ;(async ()=>{
            const client = await pool.connect();
            const post_date = new Date();

            try{
              
                const postData = 'INSERT INTO posts(image,predicted_concepts,probability,posted) VALUES($1,$2,$3,$4) RETURNING id';
                await client.query(postData,[image,predicted_concepts,probability,post_date])
            }
            catch(error){
                throw error;
            }
        })().catch(e=> console.log(e.stack));
    }
        module.exports = {
            handleApiCall,
            handlePost
        }