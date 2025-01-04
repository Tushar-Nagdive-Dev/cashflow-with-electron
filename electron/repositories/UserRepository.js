const AppDataSource = require('../preload');
const User = require('../entities/User');

const UserRepository = AppDataSource.getRepository(User);

module.exports = UserRepository;
