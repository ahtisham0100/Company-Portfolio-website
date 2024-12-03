//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
  
import  express from "express"
import bodyParser from "body-parser"; 
import  path, { dirname } from "path" 
import { fileURLToPath } from "url" 
   

const  app = express(); 
const port = 3000; 
const _filename  = fileURLToPath(import.meta.url); 
const _dirname  =  path.dirname(_filename);
app.use(bodyParser.urlencoded({extended:true}));

app.get("/"  , (req, res, next)=> { 

    res.sendFile(path.join(_dirname , "public" , "index.html"));
})
 
app.post("/check" , (req, res )=> { 

    const  password = req.body.password; 
    console.log(req.body);
    console.log(password);  
    
    if (password==="Ayti123.") {
        console.log("Login Succcessful !");
        res.sendFile(path.join(_dirname , "public" , "secret.html"));
    } else  {
res.sendFile(path.join(_dirname , "public" , "index.html"));
    } 
});

app.listen(port,()=> {
    console.log( `listening on port ${port}`);
})