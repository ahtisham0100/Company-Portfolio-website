import express, { application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

// Initialize Express app
const app = express();

// Get current directory for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection pool (reusable)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '7122',
    database: 'project_management_system',
};

let db;

(async () => {
    try {
        db = await mysql.createPool(dbConfig);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
    }
})();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


// Routes
app.get('/', async (req, res) => {
    try {
        // Fetch Dashboard Statistics
        const [totalProjects] = await db.query(`SELECT COUNT(*) AS totalProjects FROM Projects`);
        const [completedProjects] = await db.query(`SELECT COUNT(*) AS completedProjects FROM Projects WHERE status = 'Completed'`);
        const [pendingInvoices] = await db.query(`SELECT COUNT(*) AS pendingInvoices FROM Invoices WHERE status = 'Pending'`);
        const [totalClients] = await db.query(`SELECT COUNT(*) AS totalClients FROM Clients`);

        // Fetch Recent Projects
        const [recentProjects] = await db.query(`
            SELECT p.project_name, c.client_name, p.status, p.financial_status
            FROM Projects p
            JOIN Clients c ON p.client_id = c.client_id
            ORDER BY p.start_date DESC
            LIMIT 5
        `);

        res.render('dashboard', {
            stats: {
                totalProjects: totalProjects[0].totalProjects,
                completedProjects: completedProjects[0].completedProjects,
                pendingInvoices: pendingInvoices[0].pendingInvoices,
                totalClients: totalClients[0].totalClients,
            },
            recentProjects: recentProjects,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Internal Server Error');
    }
});
  

// Fetch Project Completion Status
app.get('/api/projects-status', async (req, res) => {
    try {
        const [status] = await db.query(`
            SELECT 
                SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completedProjects,
                SUM(CASE WHEN status != 'Completed' THEN 1 ELSE 0 END) AS uncompletedProjects
            FROM Projects
        `);
        res.json(status[0]);
    } catch (error) {
        console.error('Error fetching project status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fetch Invoice Status
app.get('/api/invoices-status', async (req, res) => {
    try {
        const [status] = await db.query(`
            SELECT 
                SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS completedInvoices,
                SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pendingInvoices
            FROM Invoices
        `);
        res.json(status[0]);
    } catch (error) {
        console.error('Error fetching invoice status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.get('/clients', async (req, res) => {
    try {
        // Fetch all clients from the database
        const [clients] = await db.query('SELECT * FROM Clients');

        // Render the clients list view
        res.render('clientlist', { clients });
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).send('Internal Server Error');
    }
});  


// Route to display the Add/Edit Client form
app.get('/clients/edit/:id?', async (req, res) => {
    const clientId = req.params.id;

    try {
        if (clientId) {
            // Fetch the client data for editing
            const [result] = await db.query('SELECT * FROM Clients WHERE client_id = ?', [clientId]);

            if (result.length === 0) {
                return res.status(404).send('Client not found');
            }

            // Render form with existing client data
            res.render('clientsform', { client: result[0] });
        } else {
            // Render form for adding a new client
            res.render('clientsform', { client: null });
        }
    } catch (error) {
        console.error('Error loading client form:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Route to handle the Add/Edit Client form submission
app.post('/clients/save', async (req, res) => {
    const { client_id, client_name, contact_name, contact_email, contact_phone } = req.body;

    try {
        if (client_id) {
            // Update existing client
            await db.query(
                `UPDATE Clients SET client_name = ?, contact_name = ?, contact_email = ?, contact_phone = ? WHERE client_id = ?`,
                [client_name, contact_name, contact_email, contact_phone, client_id]
            );
        } else {
            // Insert new client
            await db.query(
                `INSERT INTO Clients (client_name, contact_name, contact_email, contact_phone) VALUES (?, ?, ?, ?)`,
                [client_name, contact_name, contact_email, contact_phone]
            );
        }

        res.redirect('/clients');
    } catch (error) {
        console.error('Error saving client data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to delete a client
app.post('/clients/delete/:id', async (req, res) => {
    const { id } = req.params;  // Get the client_id from the URL parameter

    try {
        // Perform the delete query
        await db.query('DELETE FROM Clients WHERE client_id = ?', [id]);

        // Redirect to the clients list after deletion
        res.redirect('/clients');
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).send('Internal Server Error');
    }
});
 


//project related 


// Fetch Projects
app.get('/projects', async (req, res) => {
    try {
        const [projects] = await db.query(`
            SELECT p.project_id, p.project_name, p.description, p.start_date, p.status, p.financial_status, c.client_name 
            FROM Projects p
            JOIN Clients c ON p.client_id = c.client_id
        `);
        res.render('projects', { projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Add Project Form (GET)
app.get('/projects/add', async (req, res) => {
    try {
        const [clients] = await db.query('SELECT client_id, client_name FROM Clients');
        res.render('editproject', { project: null, clients });
    } catch (error) {
        console.error('Error fetching clients for adding project:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Edit Project Form (GET)
app.get('/projects/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {

        
        const [clients] = await db.query('SELECT client_id, client_name FROM Clients');
        const [projects] = await db.query('SELECT * FROM Projects WHERE project_id = ?', [id]);
        
        if (projects.length > 0) {
            res.render('editproject', { project: projects[0], clients });
        } else {
            res.status(404).send('Project not found');
        }
    } catch (error) {
        console.error('Error fetching project for edit:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Save or Update Project (POST)
app.post('/projects/save', async (req, res) => {
    const { project_id, project_name, description, start_date, status, client_id, financial_status } = req.body;

    try {
        if (project_id) {
            // Update project
            console.log("Updating the project \n ")
            await db.query(
                `UPDATE Projects 
                 SET project_name = ?, description = ?, start_date = ?, status = ?, client_id = ?, financial_status = ?
                 WHERE project_id = ?`,
                [project_name, description, start_date, status, client_id, financial_status, project_id]
            );
        } else {
            // Insert new project
            await db.query(
                `INSERT INTO Projects (project_name, description, start_date, status, client_id, financial_status)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [project_name, description, start_date, status, client_id, financial_status]
            );
        }

        res.redirect('/projects');
    } catch (error) {
        console.error('Error saving project:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Delete Project (POST with _method=DELETE)
app.post('/projects/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Projects WHERE project_id = ?', [id]);
        res.redirect('/projects');
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).send('Internal Server Error');
    }
});

  

// project details. It implemets the stored procedure
// app.get('/project/:project_id', async (req, res) => {
//     const projectId = req.params.project_id;

//     try {
//         // Fetch Project Details
//         const [projectDetails] = await db.query(
//             `SELECT p.project_name, p.description, p.status, p.financial_status, c.client_name
//             FROM Projects p
//             JOIN Clients c ON p.client_id = c.client_id
//             WHERE p.project_id = ?`,
//             [projectId]
//         );

//         if (projectDetails.length === 0) {
//             return res.status(404).send('Project not found');
//         }

//         // Fetch Employees Assigned and Hours Worked (from Timesheets)
//         const [employeesAssigned] = await db.query(
//             `SELECT e.employee_name, t.hours, t.date_worked
//             FROM Timesheets t
//             JOIN Employees e ON t.employee_id = e.employee_id
//             WHERE t.project_id = ?`,
//             [projectId]
//         );

//         // Fetch Invoice Status
//         const [invoiceStatus] = await db.query(
//             `SELECT status FROM Invoices WHERE project_id = ?`,
//             [projectId]
//         );

//         // Check for missing data
//         console.log('Project:', projectDetails);
//         console.log('Employees:', employeesAssigned);
//         console.log('Invoice:', invoiceStatus);

//         const project = projectDetails[0];  // Extract project details
//         const employees = employeesAssigned || [];  // Fallback to empty array if no employees
//         const invoice = invoiceStatus && invoiceStatus[0] ? invoiceStatus[0].status : 'No invoice found';

//         // Render Project Details Page
//         res.render('project-details', {
//             project: project,
//             employees: employees,
//             invoice: invoice
//         });
//     } catch (error) {
//         console.error('Error fetching project details:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


app.get('/project/:project_id', async (req, res) => {
    const projectId = req.params.project_id;

    try {
        // Call the stored procedure
        const projectDetails = await db.query(
            `CALL GetProjectDetails(?)`,
            [projectId]
        );
        console.log("project details : " + JSON.stringify(projectDetails[0][0]));
        console.log("employees details : " + JSON.stringify(projectDetails[0][1]));
        console.log("invoice status"+ JSON.stringify(projectDetails[0][2]))

        const projectDetail = projectDetails[0][0] ;
        const empDetails = projectDetails[0][1];
        const inv= projectDetails[0][2];

  



        // Render the project details page
        res.render('project-details', {
            project: projectDetail[0],
            employees: empDetails,
            invoice: inv[0] //invoice was array extracted from another array
        });  

         

    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get("/invoices" , async(req, res)=>{  

    try {
        // Call the stored procedure
        const invoice = await db.query(
            `select * from invoices`
        );

const invoiceDetails = invoice[0];
        console.log("invoice details : "+ JSON.stringify(invoiceDetails))

        



        // Render the project details page
        res.render('invoice', {
           
            invoice:invoiceDetails //invoice was array extracted from another array
        });  

         

    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).send('Internal Server Error');
    }

}) ;

 
// GET route to display update timesheet page
// GET route to display update timesheet page
app.get('/updatetimesheet', async (req, res) => {
    try {
        // Fetch all projects along with their client ID and name
        const [projects] = await db.query(`
            SELECT 
                p.project_id, 
                p.project_name, 
                c.client_id, 
                c.client_name 
            FROM Projects p
            LEFT JOIN Clients c ON p.client_id = c.client_id
        `);

        // Fetch all employees
        const [employees] = await db.query('SELECT employee_id, employee_name FROM Employees');

        // Fetch existing timesheet entries with project, employee, and client details
        const [timesheets] = await db.query(`
            SELECT 
                t.timesheet_id, 
                t.project_id, 
                p.project_name, 
                t.employee_id, 
                e.employee_name, 
                t.hours, 
                t.date_worked,
                p.client_id,
                c.client_name
            FROM Timesheets t
            JOIN Projects p ON t.project_id = p.project_id
            JOIN Employees e ON t.employee_id = e.employee_id
            LEFT JOIN Clients c ON p.client_id = c.client_id
            ORDER BY t.date_worked DESC
        `);

        res.render('timesheet', { projects, employees, timesheets });
    } catch (error) {
        console.error('Error fetching timesheet data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to handle update operation
app.post('/timesheet/update', async (req, res) => {

    console.log("Inside the Timesheet/update")
    const { project_id, employee_id, hours, date_worked } = req.body;

    try {
        // Insert new timesheet record
        await db.query(
            `INSERT INTO Timesheets (project_id, employee_id, hours, date_worked) 
             VALUES (?, ?, ?, ?)`,
            [project_id, employee_id, hours, date_worked]
        );

        res.redirect('/updatetimesheet');
    } catch (error) {
        console.error('Error inserting timesheet entry:', error);
        res.status(500).send('Internal Server Error');
    }
});








// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
