const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"), 
      mongoose   = require("mongoose"),
      Users      = require("./models/user");

// connect to mongoDB
mongoose.connect("mongodb://localhost:27017/LAB4", {useNewUrlParser: true, useUnifiedTopology: true});

/* settings */

// tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// tell express all of our templates will be ejs
app.set("view engine", "ejs");
// tell express to serve "public" dir
app.use(express.static(`${__dirname}/public`));
// tell express to serve "views" dir
app.set('views', `${__dirname}/views`);

// let Users = [
//     {user: 'Peter', pwd: '123123'},
//     {user: 'Tony', pwd: '456456'},
//     {user: 'Kevin', pwd: '789789'}
// ];

/* define some routes */

app.get("/", (req, res) => {
	res.send("Home page!!");
});

app.get("/users", (req, res) => {
    // get all users from DB
	Users.find({}, (err, allUsers) => {
		if(err) {
			console.log(err);
		} else {
			res.render("./usersPage", {Users: allUsers});
		}
	});	
});

app.get("/users/new", (req, res) => {
	res.render("./newUserPage");
});

app.post("/users", (req, res) => {
    console.log(req.body);
    const newUser = req.body.r;
    
    // create a new user and save to DB
	Users.create(newUser, (err, newlyCreated) => {
		if(err) {
			console.log(err);
		} else {
			//redirect
            res.redirect("/users");
		}
	});
});


/* else */

app.get("*", function(req, res) {
    res.send("Page is not found!!");
});

// tell express to listen to different request
app.listen(process.env.PORT || 3000, process.env.IP, () => {
	console.log("The Server has started!!");
});
