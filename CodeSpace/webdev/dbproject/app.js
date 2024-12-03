import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3001;

app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost', // Use your MySQL Workbench host
    user: 'root',      // Your MySQL username
    password: '7122',  // Your MySQL password
    database: 'college' // Name of the database you created in Workbench
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Route to retrieve all students
app.get("/student", (req, res) => {
    const sql = "SELECT * FROM student"; // SQL query to retrieve all rows from the students table

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            return res.status(500).send("Error retrieving students data");
        }

        res.json(results); // Send the query results as a JSON response
    });
});


app.delete("/student/:sname", (req, res) => {
    const studentName = req.params.sname; // Get the student name from the URL parameter

    // SQL query to delete a student and return the remaining students
    const deleteQuery = "DELETE FROM student WHERE sname = ?";
    const fetchRemainingQuery = "SELECT * FROM student";

    db.query(deleteQuery, [studentName], (deleteErr, deleteResults) => {
        if (deleteErr) {
            console.error("Error deleting student:", deleteErr.message);
            return res.status(500).send("Error deleting student");
        }

        if (deleteResults.affectedRows === 0) {
            return res.status(404).send(`No student found with the name '${studentName}'`);
        }

        // Fetch the remaining students after deletion
        db.query(fetchRemainingQuery, (fetchErr, remainingStudents) => {
            if (fetchErr) {
                console.error("Error fetching remaining student:", fetchErr.message);
                return res.status(500).send("Error retrieving remaining students");
            }

            res.json(remainingStudents); // Return the remaining students as JSON
        });
    });
});




// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
