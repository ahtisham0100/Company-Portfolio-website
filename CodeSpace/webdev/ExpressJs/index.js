import express from "express"; 
const app =  express();
const port = 3200;

app.get('/' ,(req , res )=>{
   res.send(  `index.html`);
    });

app.listen(port, ()=>{ 
    console.log(`server is running on the port ${ port }`);

}) ;