import express from "express";
import path from "path"; 
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const _filename =  fileURLToPath(import.meta.url); 
const _dirname =  path.dirname(_filename);

const app =express();
const port = 3000;
 

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine" , "ejs");
app.get("/" , (req, res, next)=> { 
    res.sendFile(path.join(_dirname , "index.html"));
})

 app.post("/name" , (req, res)=> { 
 
    const name  =  req.body.name; 

    res.render( "index.ejs" , 
         {name}
        );
 }); 

app.listen(port , ()=> { 
    console.log(`listenting on port ${port}`);
    
})






// import express from "express";
// import path from "path"; 
// import { fileURLToPath } from "url";

// const _filename = fileURLToPath(import.meta.url); 
// const _dirname = path.dirname(_filename);

// const app = express();
// const port = 3000;

// // Middleware to parse request bodies
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Set the view engine to EJS
// app.set("view engine", "ejs");

// // Serve the HTML form
// app.get("/", (req, res) => { 
//     res.sendFile(path.join(_dirname, "index.html"));
// });

// // Handle form submission
// app.post("/name", (req, res) => { 
//     const { name } = req.body; // Extract the name from the request body 
//     console.log(name);
    
//     res.render("index.ejs", { name }); // Render the EJS template with the name
// });

// // Start the server
// app.listen(port, () => { 
//     console.log(`Listening on port ${port}`);
// });
