"use strict";

var AppDataSource = require('../preload');
var User = require('../entities/User');
var UserRepository = AppDataSource.getRepository(User);
module.exports = UserRepository;