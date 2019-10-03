'use strict';
var config = require('../config/config.js');

var User = {
	id: {
		type: config.data_type.serial,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: config.data_type.varchar,
		allowNull: false
	}
}

module.exports = User;
