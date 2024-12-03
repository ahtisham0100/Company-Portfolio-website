import { throws } from "assert";
import { error, log } from "console";
import express  from "express";  
import path, { dirname }  from "path" ; 
import { fileURLToPath } from "url";
const app  =  express(); 
const port =  3000; 
 
const __filename =  fileURLToPath(import.meta.url); 
const _dirname  = path.dirname(__filename);

//wrting the custom Middleware Function; 

const Loging =  function  (req , res , next){ 

    console.log(_dirname+ req.url); 
    console.log( "Request Method : "+ req.method);
    next();
}
 

app.get("/login" , Loging, (req, res ,next) => { 
 
    if (req.url==="/login") {
        console.log("Valid request!");
        
    }  else { 
        log("Invalid Request !") 
        throws (404);
    } 
 
next(); 
}); 




app.get("/login" , (req, res ,next) => { 
  
    res.send("<h1>  This is the inside the 2nd Login request")

});
   


app.get("/secure" , (req ,  res , next)=> { 
    console.log("request verified"); 
    next(); 
})  

app.get("/secure" , (req ,  res , next)=> { 
 console.log("Inside the second of similar middleware.")
    res.send("/secure"); 

}) 

app.listen(port  , ()=> { 
    console.log(`Running on the port ${port}`) ; 
})