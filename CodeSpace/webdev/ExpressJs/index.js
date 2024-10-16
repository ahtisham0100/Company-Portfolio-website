import express from "express"; 
const app =  express();
const port = 3000;

app.get('/' ,(req , res )=>{

    res.send(`<h1 style="padding:8px">Hello world <br>This is me Ahtisham</h1>`
    );
    
});

app.get('/about' ,(req , res )=>{

    res.send(`<h1 style="padding:8px">About me</h1>`
    );
    
});

app.get('/contact' ,(req , res )=>{

    res.send(`<h1 style="padding:8px">Contact</h1>`
    );
    
});
    //FOR STARTING THE SERVER
app.listen(port, ()=>{ 
    console.log(`server is running on the port ${ port }`);

}) ;