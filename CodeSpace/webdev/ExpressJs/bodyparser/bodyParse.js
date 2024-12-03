import bodyParser from  "body-parser";
import urlencoded from "body-parser";
import { log } from "console";
import express from "express" ; 
import path from  "path" ;
import  { fileURLToPath }  from "url";
const app =  express(); 

//parsing the application to x-www-form-urlencoded   
//without this if we console log body we will get  undefined.
   
app.use(bodyParser.urlencoded({extended:true})); 
// //parsing the application to json 


//specifying the port to listen to 
const port = 3010;
 
 

const __filename =  fileURLToPath(import.meta.url);
const _dirname=  path.dirname(__filename);
 console.log( ` ${ _dirname } `);
  
 
 app.get("/" , (req, res)=> {  

  console.log(_dirname + "/public/index.html");
 res.sendFile(_dirname + "/public/index.html")  ; 
   
}); 

 app.post("/login" ,(req, res , next)=>  {  

  //  console.log("Login was Success !" +    req.json
  //  );   
        
  console.log(req.body);
   const data =  req.json; 
  var username =  req.body.email ; 
  var pass =  req.body.password; 
   
  //  console.log(username + " " +  pass);
   
   res.send("<h1>Welcome to The college App ! </html>")
} ) ;  


//  app.get("/login"  , urlencoded , (req , res )=> { 
//    console.log("Login was Successful ! "); 
     
//   //  req.url.username;
//    var username  = req.body.username;
//    var pass  =  req.body.password;

  
//   console.log( ` username is : ${ username } and password is  :  ${password} `) ; 
//    res.send("<h1>Welcome to The college App ! </html>")

//  }) ; 

 app.listen(port , ()=>{
    console.log(`listening on the port ${port}`)
 }) ;  