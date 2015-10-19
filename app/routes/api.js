var bodyParser = require('body-parser'); 	// get body-parser
var nodemailer = require('nodemailer');
var User       = require('../models/user');
var Lead       = require('../models/lead');
var Customer       = require('../models/customer');
var CurrentOrder       = require('../models/currentorder');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// route to generate sample user
	apiRouter.post('/sample', function(req, res) {

		// look for the user named chris
		User.findOne({ 'username': 'chris' }, function(err, user) {

			// if there is no chris user, create one
			if (!user) {
				var sampleUser = new User();
				var sampleLead=new Lead();
				var sampleCustomer=new Customer()
				var sampleCurrentOrder=new CurrentOrder()
				sampleUser.name = 'Deep';  
				sampleUser.username = 'amigo'; 
				sampleUser.password = '14236';
				sampleLead.name='hi';
				sampleLead.role='Admin';
				sampleLead.byId='xxxxxx';
				sampleLead.notifications=[{chalu: new Date(), bandh: new Date()}];
				sampleCustomer.name='hi';
				sampleCustomer.role='Admin';
				sampleCustomer.byId='xxxxxx';
				sampleCurrentOrder.name='hi';
				sampleCurrentOrder.role='Admin';
				sampleCurrentOrder.byId='xxxxxx';
				sampleUser.save();
				sampleLead.save();
								sampleCustomer.save();
												sampleCurrentOrder.save();
				
												
				
			} else {
				//console.log(user);

				// if there is a chris, update his password
				user.password = 'supersecret';
				user.modifiedDate=new Date();

				user.save();
			}
			
			 var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'deep.moradia92@gmail.com', // Your email id
            pass: 'badmintoN' // Your password
        }
    });
    
    

var text = 'Yo YO !! :D\n\n';

var mailOptions = {
    from: 'deep.moradia92@gmail.com', // sender address
    to: 'deep.moradia92@gmail.com', // list of receivers
    subject: 'Email from App', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});

		});

	});

	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {

	  // find the user
	  User.findOne({
	    username: req.body.username
	  }).select('name role username password byId').exec(function(err, user) {
	
	    if (err) throw err;

	    // no user with that username was found
	    if (!user) {
	      res.json({ 
	      	success: false, 
	      	message: 'Authentication failed. User not found.' 
	    	});
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	      	});
	      } else {

	        // if user is found and password is right
	        // create a token
	       // console.log(user.name);
	        console.log(user._id);
	        console.log(user.byId);
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username,
	        	role: user.role,
	        	id:user._id,
	        	byId:user.byId
	        }, superSecret, {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});

	// route middleware to verify a token
	apiRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	});

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// on routes that end in /users
	// ----------------------------------------------------
	apiRouter.route('/users')

		// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
		//	console.log(req.body.name);
		//				console.log(req.body.role);
			var user = new User();		// create a new instance of the User model
			user.name = req.body.name;  // set the users name (comes from the request)
			user.username = req.body.username;  // set the users username (comes from the request)
			user.password = req.body.password;  // set the users password (comes from the request)
			user.role=req.body.role;
			user.byId=req.decoded.id;
	//console.log(req.decoded.id);
	//console.log(user.byId);
	//console.log(user._id);
			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'User created!' });
			});

		})

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {

			User.find({}, function(err, users) {
				if (err) res.send(err);

				// return the users
				res.json(users);
			});
		});
apiRouter.route('/leads')// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
		//	console.log(req.body.name);
		var currentorder=new CurrentOrder();
		//				console.log(req.body.role);
			var lead = new Lead();		// create a new instance of the User model
			lead.name = req.body.name;  // set the users name (comes from the request)
			//req.body.username;  // set the users username (comes from the request)
			// set the users password (comes from the request)
			if(req.body.compname) lead.compname=req.body.compname;
				if(req.body.role) lead.role=req.body.role;
				lead.byID='hii';
				currentorder.name=req.body.name;
				lead.byID=req.decoded.id;
				console.log(req.decoded.id);
				 lead.createDate=new Date();
				 lead.notifications=[{chalu:new Date(), bandh:req.body.sharedDate}];
console.log(req.body.phnNumber);
				 if(isNaN(Number(req.body.phnNumber))){
				
									return res.json({ message: ' lol' });
				};
								 				if(!isNaN(Number(req.body.phnNumber))){ lead.phnNumber=req.body.phnNumber;};
			//lead.byId=req.decoded.id;
	//console.log(req.decoded.id);
	//console.log(user.byId);
	//console.log(user._id);
			lead.save(function(err) {
				if (err) {
				console.log("error in /leads post");
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'Lead created!' });
			});

		})

			.get(function(req, res) {

			Lead.find({}, function(err, leads) {
				if (err) res.send(err);
				console.log(leads);
				// return the users
				res.json(leads);
			});
		});
		apiRouter.route('/currentorders')// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
		//	console.log(req.body.name);
		//				console.log(req.body.role);
			var currentorder = new CurrentOrder();		// create a new instance of the User model
			currentorder.name = req.body.name;  // set the users name (comes from the request)
			//req.body.username;  // set the users username (comes from the request)
			// set the users password (comes from the request)
			console.log(req.body);
			if(req.body.compname) currentorder.compname=req.body.compname;
				if(req.body.role) currentorder.role=req.body.role;
				currentorder.byID='hii';
				currentorder.byID=req.decoded.id;
		//		currentorder.log(req.decoded.id);
				 currentorder.createDate=new Date();
console.log(req.body.phnNumber);
				 if(isNaN(Number(req.body.phnNumber))){
				
									return res.json({ message: ' lol' });
				};
								 				if(!isNaN(Number(req.body.phnNumber))){ currentorder.phnNumber=req.body.phnNumber;};
			//lead.byId=req.decoded.id;
	//console.log(req.decoded.id);
	//console.log(user.byId);
	//console.log(user._id);
			currentorder.save(function(err) {
				if (err) {
				console.log("error in /currentorder post");
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'currentorder created!' });
			});

		})

			.get(function(req, res) {

			CurrentOrder.find({}, function(err, currentorders) {
				if (err) res.send(err);
				console.log(currentorders);
				// return the users
				res.json(currentorders);
			});
		});
		
		apiRouter.route('/customers')// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
		//	console.log(req.body.name);
		//				console.log(req.body.role);
			var customer = new Customer();		// create a new instance of the User model
			customer.name = req.body.name;  // set the users name (comes from the request)
			//req.body.username;  // set the users username (comes from the request)
			// set the users password (comes from the request)
			if(req.body.compname) customer.compname=req.body.compname;
				if(req.body.role) customer.role=req.body.role;
				customer.byID='hii';
				customer.byID=req.decoded.id;
				console.log(req.decoded.id);
				 customer.createDate=new Date();
console.log(req.body.phnNumber);
				 if(isNaN(Number(req.body.phnNumber))){
				
									return res.json({ message: ' lol' });
				};
								 				if(!isNaN(Number(req.body.phnNumber))){ customer.phnNumber=req.body.phnNumber;};
			//lead.byId=req.decoded.id;
	//console.log(req.decoded.id);
	//console.log(user.byId);
	//console.log(user._id);
			customer.save(function(err) {
				if (err) {
				console.log("error in /leads post");
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'customer created!' });
			});

		})

			.get(function(req, res) {

			Customer.find({}, function(err, customers) {
				if (err) res.send(err);
				console.log(customers);
				// return the users
				res.json(customers);
			});
		});
	// on routes that end in /users/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		// get the user with that id
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				// return that user
				//console.log(user.role );
				res.json(user);
				
			});
		})

		// update the user with this id
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {

				if (err) res.send(err);

				// set the new user information if it exists in the request
				if (req.body.name) user.name = req.body.name;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;

				// save the user
				user.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'User updated!' });
				});

			});
		})

		// delete the user with this id
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});
// on routes that end in /users/:lead_id
	// ----------------------------------------------------
	apiRouter.route('/leads/:lead_id')

		// get the user with that id
		.get(function(req, res) {
			Lead.findById(req.params.lead_id, function(err, lead) {
				if (err) res.send(err);

				// return that user
				//console.log(user.role );
				res.json(lead);
				
			});
		})

		// update the user with this id
		.put(function(req, res) {
			Lead.findById(req.params.lead_id, function(err, lead) {

				if (err) res.send(err);

				// set the new user information if it exists in the request
				if (req.body.name) lead.name = req.body.name;
				if(req.body.compname) lead.compname=req.body.compname;
				if(req.body.role) lead.role=req.body.role;
				if(isNaN(req.body.phnNumber)){ lead.phnNumber=req.body.phnNumber;};
				if(!isNaN(req.body.phnNumber)){
				
									res.json({ message: ' lol' });
				};
				
			
				 lead.byID=req.decode.id;
				 lead.createDate=new Date();
				 
				//if (req.body.username) user.username = req.body.username;
				//if (req.body.password) user.password = req.body.password;

				// save the user
				lead.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: ' updated!' });
				});

			});
		})

		// delete the user with this id
		.delete(function(req, res) {
			Lead.remove({
				_id: req.params.lead_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});
	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
		//console.log(req.decoded.id);
	});

	return apiRouter;
};
