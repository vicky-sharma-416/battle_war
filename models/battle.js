'use strict';
var config = require('../config/config.js');

var Battle = {
	id: {
		type: config.data_type.serial,
		allowNull: false,
		primaryKey: true
	},
	attacker_1: {
		type: config.data_type.varchar,
		allowNull: false
	},
	attacker_2: {
		type: config.data_type.varchar,
		allowNull: true
	},
	attacker_3: {
		type: config.data_type.varchar,
		allowNull: true
	},
	attacker_4: {
		type: config.data_type.varchar,
		allowNull: true
	},
	attacker_commander: {
		type: config.data_type.varchar,
		allowNull: true
	},
	attacker_king: {
		type: config.data_type.varchar,
		allowNull: false,
		defaultValue: "null"
	},
	attacker_outcome: {
		type: config.data_type.varchar,
		allowNull: false,
		defaultValue: "null"
	},
	attacker_size: {
		type: config.data_type.integer,
		allowNull: true
	},
	battle_type: {
		type: config.data_type.varchar,
		allowNull: true
	},
	defender_1: {
		type: config.data_type.varchar,
		allowNull: true
	},
	defender_2: {
		type: config.data_type.varchar,
		allowNull: true
	},
	defender_3: {
		type: config.data_type.varchar,
		allowNull: true
	},
	defender_4: {
		type: config.data_type.varchar,
		allowNull: true
	},
	defender_commander: {
		type: config.data_type.varchar,
		allowNull: true
	},
	defender_king: {
		type: config.data_type.varchar,
		allowNull: false,
		defaultValue: "null"
	},
	defender_size: {
		type: config.data_type.integer,
		allowNull: true
	},
	location: {
		type: config.data_type.varchar,
		allowNull: true
	},
	major_capture: {
		type: config.data_type.integer,
		allowNull: false,
		defaultValue: "0"
	},
	major_death: {
		type: config.data_type.integer,
		allowNull: false,
		defaultValue: "0"
	},
	name: {
		type: config.data_type.varchar,
		allowNull: false,
		defaultValue: "null"
	},
	region: {
		type: config.data_type.varchar,
		allowNull: false,
		defaultValue: "null"
	},
	summer: {
		type: config.data_type.integer,
		allowNull: true
	},
	year: {
		type: config.data_type.integer,
		allowNull: false,
		defaultValue: "0"
	},
	note: {
		type: config.data_type.text,
		allowNull: true
	},
	battle_number: {
		type: config.data_type.integer,
		allowNull: false,
		defaultValue: "0"
	}
}

module.exports = Battle;
