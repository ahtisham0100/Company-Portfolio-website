import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";
import multer from "multer";
import fs from "fs"
import { Script } from "vm";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads'); //for storing images;

const port = 3001;
const app = express();

// Serve static files from the "public" and images from uplooads directory directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('views', path.join(__dirname, 'views')); 
app.set("view engine", "ejs");

//setting up body-parser to handle forms.
app.use(bodyParser.urlencoded({extended:true}))



//uploads directory setup
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('Uploads directory created.');
} else {
    console.log('Uploads directory already exists.');
}
  

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });


//setting up  database connection;
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '7122', 
    database: 'companyblogs',
};
(async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database');
        await connection.end();
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
    }
})();


  
// Handle the root route
app.get("/", (req, res) => {
  console.log(`Serving files from directory: ${__dirname}`);
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/contact-us", (req, res) => {
  res.sendFile(path.join(__dirname , "public"  , "contact.html"));

});
 
app.post("/contact-us/message" , async(req, res , next)=>{
  const name = req.body.name;
  const email =  req.body.email; 
  const message =  req.body.message;
  const address =  req.body.address;
  const city = req.body.city; 
  const  zip= req.body.postalcode;
  const  state =  req.body.State;


   try {
              const connection = await mysql.createConnection(dbConfig); // Create a new connection
  
              // Insert the postname into the `post` table first
              const postQuery = "INSERT INTO contactus (fullname, email, message, address, city, zip,state) VALUES (?,?, ?, ?, ?, ?, ?)";
              await connection.execute(postQuery, [name, email, message, address, city, zip,state]);
              
              await connection.end(); // Close the connection after all queries
              console.log("Data inserted into database")
          } catch (err) {
              console.error('Database error:', err.message);
              return res.status(500).send('Failed to save data to the database.');
          }
 

  console.log("inside the messge name\n " + name + `\n email :${email} \n message: ${message}  \ncity:${city} \nstate:${state} \naddress:${address} \nzip:${zip}`)

  res.send(` 
    <script>
alert('Form submitted successfully! we will get back to you soon'); 
window.location.href="/home";
</script>

    `);

  });  
  

  


  app.get("/projects", async (req, res) => {    
    let connection;
    try {
        // Establish database connection
        connection = await mysql.createConnection(dbConfig);

        // Execute query
        var projects = await connection.query("SELECT postname FROM post");
projects=projects[0];
        // Log fetched projects
        console.log("Fetched projects:", projects , projects[0]);

        // Render the EJS template
        res.render('ourProjects', {array:projects});
    } catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).send("Failed to retrieve project data. Please try again later.");
    } finally {
        // Ensure the connection is closed
        if (connection) {
            await connection.end();
        }
    }
});

//individual post handling 
app.get("/projects/:projectname", async (req, res) => {
    const projectName = req.params.projectname;

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Fetch image addresses for the project
        const [images] = await connection.execute("SELECT imageaddress FROM images WHERE post = ?", [projectName]);

        // Fetch descriptions for the project
        const [description] = await connection.execute("SELECT paragraph FROM explanation WHERE post = ?", [projectName]);

        console.log("Fetched Images:", images); // Debug log
        console.log("Fetched Descriptions:", description); // Debug log

        res.render('projects', {
            projectName: projectName,
            images: images,
            description: description
        });

        await connection.end();
    } catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).json({ success: false, message: "Failed to retrieve project data" });
    }
});




// Route to serve the login page
app.get("/memberlogin", (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'memberlogin.html'));
});  


//handling the data from  memberlogin page.
app.post("/memberlogin/validate", async(req, res, next)=>{
  
    const username= req.body.email;
    const pass=  req.body.password; 
  
 var validated=  false;
 
 if(username==="member@company.com" && pass=== "member123") {
     console.log("Login Successful !"); 

try {
const noOfcontacts  =   "select count(fullname) as count from contactus";
const noOfPosts =  "select count(postname) as count from post";

    const connection = await  mysql.createConnection(dbConfig); 
    var [contactBack] = await connection.execute(noOfcontacts);
    var [noOfProjects] =  await connection.execute(noOfPosts);

contactBack =  contactBack[0].count; 
noOfProjects= noOfProjects[0].count; 

console.log(`projects : ${noOfProjects} \nContacts : ${contactBack}`)
connection.end();

//rendering the dir name;
res.render(path.join(__dirname, "views", "dashboard.ejs"), {
    contactBack: contactBack,
    noOfProjects: noOfProjects
  });

} catch (error) {
    console.log(err);
    res.status(500).send(error);
}

 } else { 
  
    res.send(`
        <html>
            <head>
                <title>Login Error</title>
                <script>
                    window.alert("Wrong Password");
                    window.location.href = "/memberlogin";
                </script>
            </head>
            <body></body>
        </html>
    `);
 }
});
  
   
//contact us route 

app.get("/memberlogin/admin/contact-requests", async(req, res)=>{

    try {
        const connection  = await mysql.createConnection(dbConfig);  

        const query =  "select * from contactus"; 
        var [data]= await connection.execute(query); 

        console.log(data);
connection.end();

res.render(path.join(__dirname,"views" , "contactForm"), {data:data});

    } catch (error) {
        console.log(error);
    }

})


//upload image and description functionalty; 
app.get("/memberlogin/admin/addpost" , (req, res)=> { 
    res.render(path.join(__dirname , "views" , "imageUpload"))
}
);
 

//handling the image upload form;

//route to handle form data and adding it to database.
app.post('/memberlogin/admin/addpost/upload', upload.array('images[]'), async (req, res) => {
    const projectName = req.body.projectName;
    const descriptions = req.body['description'];
    const uploadedFiles = req.files;

    // Logging project name
    console.log('Project Name:', projectName);

    // Logging descriptions
    if (Array.isArray(descriptions)) {
        descriptions.forEach((desc, index) => console.log(`Description ${index + 1}: ${desc}`));
    } else {
        console.log('Description 1:', descriptions);
    }

    // Logging uploaded files
    if (Array.isArray(uploadedFiles)) {
        try {
            const connection = await mysql.createConnection(dbConfig); // Create a new connection

            // Insert the postname into the `post` table first
            const postQuery = "INSERT INTO post (postname) VALUES (?)";
            await connection.execute(postQuery, [projectName]);
            console.log(`Post '${projectName}' inserted into the post table.`);

            // Upload files into the database
            for (const file of uploadedFiles) {
                const imageQuery = "INSERT INTO images (post, imageaddress) VALUES (?, ?)";
                await connection.execute(imageQuery, [projectName, file.filename]);
                console.log(`File ${file.filename} inserted successfully`);
            }

            // Insert descriptions if they exist
            if (descriptions && Array.isArray(descriptions) && descriptions.length > 0) {
                for (const desc of descriptions) {
                    const query = "INSERT INTO explanation (post, paragraph) VALUES (?, ?)";
                    await connection.execute(query, [projectName, desc]);
                    console.log(`Description inserted successfully: ${desc}`);
                }
            } else {
                console.log('No descriptions to insert.');
            }

            await connection.end(); // Close the connection after all queries 
            const path =  `http://localhost:${port}/`;
            const redirectPath = `${path}dashboard`; // Construct URL correctly
            
            res.send(`<script> 
                window.alert("New Case Study Was added successfully");
                window.location.href = "${redirectPath}";
            </script>`);
            
            
        } catch (err) {
            console.error('Database error:', err.message);
            return res.status(500).send('Failed to save data to the database.');
        }
    } else {
        console.log('Uploaded File:', uploadedFiles);
    }
});




app.get("/dashboard", async(req, res, next)=>{


try {
const noOfcontacts  =   "select count(fullname) as count from contactus";
const noOfPosts =  "select count(postname) as count from post";

    const connection = await  mysql.createConnection(dbConfig); 
    var [contactBack] = await connection.execute(noOfcontacts);
    var [noOfProjects] =  await connection.execute(noOfPosts);

contactBack =  contactBack[0].count; 
noOfProjects= noOfProjects[0].count; 

console.log(`projects : ${noOfProjects} \nContacts : ${contactBack}`)
connection.end();

//rendering the dir name;
res.render(path.join(__dirname, "views", "dashboard.ejs"), {
    contactBack: contactBack,
    noOfProjects: noOfProjects
  });

} catch (error) {
    console.log(err);
    res.status(500).send(error);
}

});
  



// Start the server
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
