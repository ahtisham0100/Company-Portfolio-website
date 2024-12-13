import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current filename and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3001;
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Handle the root route
app.get("/", (req, res) => {
  console.log(`Serving files from directory: ${__dirname}`);
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
  
 
app.get("/contact-us" , (req , res)=> {

    res.send(`
        <li class="nav-item">
                <a class="nav-link" href="contact-us/email">Contact us</a>
              </li>
        `);
}) 
 
app.get("/contact-us/email" , (req , res)=> {
    res.send(`Email address.`)
})

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
