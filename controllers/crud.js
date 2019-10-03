// Load modules
var pg = require('pg');
var config = require('../config/config.js');
var conString = "postgres://" + config.user_name + ":" + config.password + "@" + config.host + ":" + config.port + "/" + config.database_name;
//var conString = "postgres://postgres:cdn123@localhost:5432/local";
var client = new pg.Client(conString);
client.connect();

var attributes = {
	list: 'location',
	count: 'count(id) as battle_count',
	stats: {
		// TODO :: Need to check
		///battle_type: 'distinct battle_type,', // unique battle types
		defender_size: "avg(defender_size) as avg_defender_size, min(defender_size) as min_defender_size, max(defender_size) as max_defender_size,",
		attacker_outcome:"attacker_outcome, count(attacker_outcome) as attacker_count",
	},
	group_by: 'attacker_outcome'
}

module.exports = {
	
	POST: function(req, endPoint, res){

		var body = JSON.parse(JSON.stringify(req.body));
		
		var models = require('../models/' + endPoint + '.js');
		var query = "INSERT INTO public." + endPoint + " ("; 
		var values = 'VALUES(';
		
		if(Array.isArray(body)){
			for(var obj in body){
				Object.keys(models).map(function(key, index){
					if(body[obj].hasOwnProperty(key) && (key !== 'id')){
						
						var value = body[obj][key]
					
						console.log(' -- key: ', key, ' \t val: ', value);
						
						if(obj == 0)
							query += '"' + key + '", ';
						
						// TODO :: Need to check
						if(typeof value == "string" && value.includes("'"))
							value = value.replace(/'/g, "");
							///value = "concat(" + value.split("'")[0] + ",'char(39)'," + value.split("'")[1] + ")";
						
						if(!value)
							values += (models[key].defaultValue ? ("'" + models[key].defaultValue + "'") : null) + ", ";
						else
							values += "'" + value + "', ";
					}
				})
				values = values.slice(0,-2)
				values += '),('
			}
			values = values.slice(0,-2)
		}
		else{
			Object.keys(models).map(function(key, index){
				if(body.hasOwnProperty(key) && (key !== 'id')){
					query += '"' + key + '", ';
					var value = body[key];
					
					if(typeof value == "string" && value.includes("'"))
						value = value.replace(/'/g, "");

					if(!value)
						values += (models[key].defaultValue ? ("'" + models[key].defaultValue + "'") : null) + ", ";
					else
						values += "'" + value + "', ";
				}
			})
			values = values.slice(0,-2);
			values += ')';
		}
		
		query = query.slice(0,-2) + ') ' + values + ' RETURNING *';
		
		console.log(' -- query ' + query);
		
		tableCreated(endPoint)
			.then(result => {
				return client.query(query)
			})
			.then(result => {
				console.log(` -- endPoint ` + JSON.stringify(result.rows));
				var obj = {};
					obj[endPoint] = result.rows;
			
				res.status(201).send(obj);
			})
			.catch(error => {		
				console.log(' -- crud_error ', error);
				res.status(500).send({message: error.message});
			})
	},
	
	GET: function(req, endPoint, res){
		console.log(' -- req.params ' + JSON.stringify(req.params) + '\t -- requested_query ' + JSON.stringify(req.query));

		var query = "SELECT * FROM public." + endPoint;		
		var url = req.originalUrl.split('/')[1];		
		var modelAttributes = require('../models/' + endPoint + '.js');
			modelAttributes = Object.keys(modelAttributes);
			
		if(attributes.hasOwnProperty(url)){
			if(attributes[url] instanceof Object){
				query = 'SELECT ';
				
				for(var key in attributes[url]){
					query += attributes[url][key];
				}
				
				query += ' FROM public.' + endPoint + ' GROUP BY ' + attributes.group_by;
			}
			else{
				query = 'SELECT ' + attributes[url] + ' FROM public.' + endPoint;
			}
		}
		else if(req.params && req.params.id){
			query += " WHERE id=" + req.params.id;			
		}
		else if(Object.getOwnPropertyNames(req.query).length > 0){
			query += " WHERE ";
			
			// Match key from model attributes
			for(var index in modelAttributes){
				Object.keys(req.query).filter(function(key){
					if(modelAttributes[index].includes(key))
						query += modelAttributes[index] + "='" + req.query[key] + "' AND ";
				})
			}
			query = query.slice(0,-5);
		}

		console.log(' -- query: ' + query);
		
		client
			.query(query)
			.then(result => {		
				console.log(' -- result ' + JSON.stringify(result.rows));
				
				var obj = {};
					obj[endPoint] = result.rows;
					
				if(result.rows.length > 0){
					res.status(200).send(obj);
				}
				else{
					res.status(404).send(obj);
				}
			})
			.catch(error => {		
				console.log(' -- crud_error ' + error.message);
				res.status(500).send({message: error.message});
			})
		
	},
	
	PUT: function(req, endPoint, models, res){
		res.status(405).send({message: "Method not allowed."});
	},
	
	DELETE: function(req, endPoint, models, res){
		res.status(405).send({message: "Method not allowed."});
	}	

}

function tableCreated(endpoint){

	var models = require('../models/' + endpoint + '.js');
	var createTable = "CREATE TABLE IF NOT EXISTS public." + endpoint + " (";
	
	for(var key in models) {
		createTable += key + ' ' + models[key].type;
	
		if(models[key].primaryKey)
			createTable += ' NOT NULL PRIMARY KEY';
		else if(models[key].defaultValue && !models[key].allowNull)
			createTable += ' NOT NULL DEFAULT ' + models[key].defaultValue;
		else if(!models[key].allowNull)
			createTable += ' NOT NULL';
		
		createTable += ', '
	}

	createTable = createTable.slice(0,-2) + ')'

	console.log(' -- createTable: ' + createTable);
	
	return client.query(createTable);
}
