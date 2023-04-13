/*
{{!--  
Sources:
    This code was written by referencing various resources:
    - Exploration - Developing in Node.JS, https://canvas.oregonstate.edu/courses/1901738/pages/exploration-developing-in-node-dot-js?module_item_id=22733737
    - Activity 2 - Connect webapp to database (Individual), https://canvas.oregonstate.edu/courses/1901738/assignments/9070964?module_item_id=22733669
    
    Kestt van Zyl and Seongki Lee Group 154
 --}}
*/

// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 3133;                 // Set a port number at the top so it's easy to change in the future
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/branches/', function(req, res)
    {  
        let query1 = "SELECT * FROM Branches;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('branches', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });    
    

    app.post('/branches/add-branch-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Capture NULL values
        

        let active = parseInt(data.active);
        if (isNaN(active))
        {
            active = 'NULL'
        }

        // Create the query and run it on the database
        query1 = `INSERT INTO Branches (branch_id, branch_address, active) VALUES ('${data.branch_id}',  '${data.branch_address}',  ${active})`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                query2 = `SELECT * FROM Branches;`;
                db.pool.query(query2, function(error, rows, fields){

                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

    app.delete('/branches/delete-branch-ajax/', function(req,res,next){
        let data = req.body;
        let branchID = parseInt(data.branch_id);
        let deleteBranch = `DELETE FROM Branches WHERE branch_id = ?`;
        
      
      
              // Run the 1st query
              db.pool.query(deleteBranch, [branchID], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
      
                  else
                  {
                    query2 = `SELECT * FROM Branches;`;
                    db.pool.query(query2, function(error, rows, fields){
    
                        // If there was an error on the second query, send a 400
                        if (error) {
                            
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // If all went well, send the results of the query back.
                        else
                        {
                            res.send(rows);
                        }
                    })
                  }
    })});
    
    app.put('/branches/put-branch-ajax', function(req,res,next){
        let data = req.body;

        let queryUpdateBranchAddress = `UPDATE Branches SET branch_address = '${data.branch_address}' WHERE Branches.branch_id = ?`;
        let updateBranchAddress = `SELECT * FROM Branches WHERE branch_id = ?`
      
              // Run the 1st query
              db.pool.query(queryUpdateBranchAddress, [data.branch_id], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
      
                  // If there was no error, we run our second query and return that data so we can use it to update the people's
                  // table on the front-end
                  else
                  {
                      // Run the second query
                      db.pool.query(updateBranchAddress, [(data.branch_id)], function(error, rows, fields) {
      
                          if (error) {
                              console.log(error);
                              res.sendStatus(400);
                          } else {
                              res.send(rows);
                          }
                      })
                  }
      })});

app.get('/vehicles/', function(req, res)
    {  
        let query1 = "SELECT * FROM Vehicles;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('vehicles', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    }); // received back from the query


    app.post('/vehicles/add-vehicle-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Capture NULL values

        let vehicle_id = parseInt(data.vehicle_id);
        if (isNaN(vehicle_id))
        {
            vehicle_id = 'NULL'
        }

        let active = parseInt(data.active);
        if (isNaN(active))
        {
            active = 'NULL'
        }

        // Create the query and run it on the database
        query1 = `INSERT INTO Vehicles (vehicle_id, segment, brand, name, plate, active) VALUES (${vehicle_id}, '${data.segment}', '${data.brand}', '${data.name}', '${data.plate}',  ${active})`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                query2 = `SELECT * FROM Vehicles;`;
                db.pool.query(query2, function(error, rows, fields){

                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

    app.delete('/vehicles/delete-vehicle-ajax/', function(req,res,next){
        let data = req.body;
        let vehicleID = parseInt(data.vehicle_id);
        let deleteVehicle = `DELETE FROM Vehicles WHERE vehicle_id = ?`;
        
      
      
              // Run the 1st query
              db.pool.query(deleteVehicle, [vehicleID], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
      
                  else
                  {
                    query2 = `SELECT * FROM Vehicles;`;
                    db.pool.query(query2, function(error, rows, fields){
    
                        // If there was an error on the second query, send a 400
                        if (error) {
                            
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // If all went well, send the results of the query back.
                        else
                        {
                            res.send(rows);
                        }
                    })
                  }
      })});

app.get('/users/', function(req, res)
    {  
        let query1 = "SELECT * FROM Users;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('users', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    }); // received back from the query


    app.post('/users/add-user-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Capture NULL values
        let user_id = parseInt(data.user_id);
        if (isNaN(user_id))
        {
            user_id = 'NULL'
        }

        // Create the query and run it on the database
        query1 = `INSERT INTO Users (user_id, user_name, rental_date, return_date) VALUES (${user_id}, '${data.user_name}', '${data.rental_date}',
        '${data.return_date}')`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                query2 = `SELECT * FROM Users;`;
                db.pool.query(query2, function(error, rows, fields){

                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.delete('/users/delete-user-ajax/', function(req,res,next){
        let data = req.body;
        let userID = parseInt(data.user_id);
        let deleteUser = `DELETE FROM Users WHERE user_id = ?`;
        
      
      
              // Run the 1st query
              db.pool.query(deleteUser, [userID], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
      
                  else
                  {
                    query2 = `SELECT * FROM Users;`;
                    db.pool.query(query2, function(error, rows, fields){
    
                        // If there was an error on the second query, send a 400
                        if (error) {
                            
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // If all went well, send the results of the query back.
                        else
                        {
                            res.send(rows);
                        }
                    })
                  }
      })});
    
      app.put('/users/put-user-ajax', function(req,res,next){
        let data = req.body;

        let queryUpdateUserName = `UPDATE Users SET user_name = '${data.user_name}' WHERE Users.user_id = ?`;
        let updateUserName = `SELECT * FROM Users WHERE user_id = ?`
      
              // Run the 1st query
              db.pool.query(queryUpdateUserName, [data.user_id], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
      
                  // If there was no error, we run our second query and return that data so we can use it to update the people's
                  // table on the front-end
                  else
                  {
                      // Run the second query
                      db.pool.query(updateUserName, [(data.user_id)], function(error, rows, fields) {
      
                          if (error) {
                              console.log(error);
                              res.sendStatus(400);
                          } else {
                              res.send(rows);
                          }
                      })
                  }
      })});

app.get('/rentals/', function(req, res)
    {  
        let query1 = "SELECT * FROM Rentals;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('rentals', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    }); // received back from the query




app.get('/', function(req, res)
    {  
        // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM Rental_History;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Rental_History WHERE user_name LIKE "${req.query.lname}%"`
    }

    //dropdown
    let query2 = "SELECT * FROM Users;"
    let query3 = "SELECT * FROM Branches;"
    let query4 = "SELECT * FROM Vehicles;"

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        let rentals = rows;
        db.pool.query(query2, function(error, rows, fields){
            let users = rows;
            db.pool.query(query3, function(error, rows, fields){
                let branches = rows;
                db.pool.query(query4, function(error, rows, fields){
                    let vehicles = rows;
                    return res.render('index',{data: rentals, users:users, branches:branches, vehicles:vehicles});
                })
            
            })
            
        })        
    })                                                      // an object where 'data' is equal to the 'rows' we
    }); // received back from the query

    
/*
    app.post('/add-rental-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        query1 = 'SELECT * FROM Users WHERE user_id = ?';
        
        query2 = 'SELECT * FROM Branches WHERE branch_id = ?';
        
        query3 = 'SELECT * FROM Vehicles WHERE vehicle_id = ?';
        
        db.pool.query(query1, [data.user_id], function(error, rows, fields){
            let users = rows;
            console.log(users.user_id)
            db.pool.query(query2, [data.branch_id], function(error, rows, fields){
                let branches = rows;
                db.pool.query(query3, [data.vehicle_id], function(error, rows, fields){
                    let vehicles = rows;
                    query4 = `INSERT INTO Rental_History (branch_id, branch_address, vehicle_id, user_id, user_name, rental_date, return_date) VALUES ('${branches.branch_id}', '${branches.branch_address}', '${vehicles.vehicle_id}', '${users.user_id}', '${users.user_name}','${users.rental_date}','${users.return_date}')`;
                    db.pool.query(query4, function(error, rows, fields){

                        // Check to see if there was an error
                        if (error) {
                            
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            
                            res.sendStatus(400);
                        }

                        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
                        // presents it on the screen
                        else
                        {
                            query5 = `SELECT * FROM Rental_History;`;
                            db.pool.query(query5, function(error, rows, fields){

                                // If there was an error on the second query, send a 400
                                if (error) {
                                    
                                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                                    console.log(error);
                                    
                                    res.sendStatus(400);
                                }
                                // If all went well, send the results of the query back.
                                else
                                {
                                    res.send(rows);
                                }
                            })
                        }
                    })
                })
            })
        })
        

        // Create the query and run it on the database
        
    });
*/
    app.delete('/delete-rental-ajax/', function(req,res,next){
        let data = req.body;
        let rentalID = parseInt(data.rental_id);
        let deleteRental = `DELETE FROM Rental_History WHERE rental_id = ?`;
        
      
      
              // Run the 1st query
              db.pool.query(deleteRental, [rentalID], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
      
                  else
                  {
                    query2 = `SELECT * FROM Rental_History;`;
                    db.pool.query(query2, function(error, rows, fields){
    
                        // If there was an error on the second query, send a 400
                        if (error) {
                            
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // If all went well, send the results of the query back.
                        else
                        {
                            res.send(rows);
                        }
                    })
                  }
    })});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});