// Load modules
var express = require('express');
var router = express.Router();

// Middleware to sent response with headers
router.use(function(req, res, next){
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

// Battle POST endpoint, creates table and insert reacord 
router.post('/battle', function(req, res){
	controllers (req, 'battle', res);
})

/*
// Single GET endpoint 
router.get('/:get_url', function(req, res){
	controllers (req, 'battle', res);
})
*/

// Battle GET endpoint 
router.get('/list', function(req, res){
	controllers (req, 'battle', res);
})

// Battle GET endpoint 
router.get('/count', function(req, res){
	controllers (req, 'battle', res);
})

// Battle GET endpoint 
router.get('/search', function(req, res){
	controllers (req, 'battle', res);
})

// Battle GET endpoint 
router.get('/stats', function(req, res){
	controllers (req, 'battle', res);
})

// Response undefined url 
router.use('*', function(req, res){
	res.status(404).send({message: 'Not Found, Invalid URL'});
})

// Calling controller according consumed url
function controllers (event, fileName, res){	
	console.log(' -- calling_controller: ' + './controllers/' + fileName + '.js');
	console.log(' -- event.method: ' + event.method);		
	
	try{
		var controller = require('./controllers/' + fileName + '.js');
	}
	catch(err){
		var controller = require('./controllers/crud.js');
	}
	
	controller[event.method](event, fileName, res);
}

module.exports = router;
