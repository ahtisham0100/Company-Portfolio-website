import express from "express"; 
import bodyParser from "body-parser";
import path from  "path"; 
import { fileURLToPath } from "url"; 
 
 
 const  _filename =  fileURLToPath(import.meta.url); 
 const  _dirname =  path.dirname(_filename); 

 
const app =  express(); 
const port = 3000; 

app.use(bodyParser.urlencoded({extended:true}));

 
app.get("/"  , (req  , res , next)=>{ 
 
    res.sendFile(path.join(_dirname , "public" , "index.html")
);
}) ;

app.post("/bandname" , (req , res , next)=> {   
const dog = req.body.dogName ;  
const street =  req.body.streetName; 
 
console.log(req.body);
const bandname = dog+street; 

console.log(bandname);

res.send(`<h1>The band name is </h1> <em>  \n ${bandname} </em>`)
});

app.listen(port , ()=>{ 
    console.log(`Server running on port ${port} .`);
})
