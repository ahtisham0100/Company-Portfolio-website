import { log } from "console";
import express from "express"; 
import { dirname } from "path";
import { fileURLToPath, urlToHttpOptions } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url)) ;

const app =express(); 
const port = 3000; 

app.get("/" , (req, res)=>{
    res.sendFile(__dirname+`/public/index.html`);
});

app.post("/submit",(req,res)=> {
    res.sendFile(__dirname+`/public/submit.html`)
    console.log(req.body);
}) ; 

app.listen(port , ()=>{
    console.log(`Server running on port ${port} `);
    
})