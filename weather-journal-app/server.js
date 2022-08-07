// Setup empty JS object to act as endpoint for all routes
projectData = {

};

// Require Express to run server and routes
const express = require("express");

const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();

const port = 3030;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("./website"));

// Setup Server
const server = app.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});

// Initialize all route with a callback function
app.get("/all", getData);

// Callback function to complete GET '/all'
function getData(req, res) {
    console.log(projectData);
    res.send(projectData)
}

// Post Route
app.post("/postData", postData);

// Callback function to complete GET '/postData'
function postData(req, res) {
    projectData = req.body
    console.log(projectData);
    res.send(projectData)
     
};

