import express from "express" ; 
import path from  "path" ;
import  { fileURLToPath }  from "url";
const app =  express();
const port = 3001;
 
 

const __filename =  fileURLToPath(import.meta.url);
const _dirname=  path.dirname(__filename);
 console.log( ` ${ _dirname } `);
  
  

  
 app.get("/loginPage" , (req, res)=> {  

  console.log(_dirname + "/public/index.html");
 res.sendFile(_dirname + "/public/index.html")  ; 
   
})   
 
 app.post("/login" , (req, res)=>  { 
   console.log("Login was Success !"); 
   res.send("<h1>Welcome to The college App ! </html>")
} ) ;  


 app.get("/login"  ,   (req , res )=> { 
   console.log("Login was Successful ! "); 
   res.send("<h1>Welcome to The college App ! </html>")

 }) ; 

 app.listen(port , ()=>{
    console.log(`listening on the port ${port}`)
 }) ;  