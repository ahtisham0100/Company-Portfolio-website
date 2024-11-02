import express, { Router } from  "express"; 

const app=  express(); 
const port =  3001; 

 {
    first_name: "Deepak" 
    last_name: "Tailor"
    mobile_no: "7742307462"
    email_id: "deepaktailor@gmail.com"
    password : "123456"
} ;
 app.get("/update_student/:id"  , (req, res, next)=>{
console.log("Updating student id");  
 res.send(req.params.id.last_name);

 })  ;

  app.listen(port ,  ()=>{ 
    console.log(`Listening at port ${port} .` );
  }) ; 
