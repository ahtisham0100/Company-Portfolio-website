import express, { query } from "express"; 
import path, { dirname } from "path"; 
import bodyParser from "body-parser";
import multer from "multer";
import mysql from "mysql2/promise";
import fs from "fs";
import { fileURLToPath } from "url";
import { validateHeaderName } from "http";
const app = express();
const port = 3001;



// Path to uploads directory
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename);   
const uploadsDir = path.join(__dirname, 'uploads');

// Check and create uploads directory if necessary
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('Uploads directory created.');
} else {
    console.log('Uploads directory already exists.');
}

// MySQL database connection
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '7122', // Replace with your password
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

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

// Middleware setup
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Routes



//default home route.
app.get("/", (req, res) => 
    res.render("index")
);




//route to handle form data and adding it to database.
app.post('/upload', upload.array('images[]'), async (req, res) => {
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
            res.send('Form data received and saved to the database.');
        } catch (err) {
            console.error('Database error:', err.message);
            return res.status(500).send('Failed to save data to the database.');
        }
    } else {
        console.log('Uploaded File:', uploadedFiles);
    }
});



 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//route to get data from prjectname; 
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





//member login 

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the login page
app.get("/memberlogin", (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'memberlogin.html'));
});  
 


//handling the data from  memberlogin page.
app.post("/memberlogin/validate", (req, res, next)=>{{ 
  
    const username= req.body.email;
    const pass=  req.body.password; 
  
 var validated=  false;
 
 if(username==="member@company.com" && pass=== "member123") {
     validated=true;
 }
 
if (validated) {
    res.redirect("/"); 

} else{ 
    next();
}

}  


});
 

//incase of non validation  redirect to same page again using middleware below
app.post("/memberlogin/validate" , (req, res)=>{ 
 
    res.redirect("/memberlogin")
})

// Error handling for file upload
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
});


// Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
