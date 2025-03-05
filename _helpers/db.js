const config = require('config.json');
const { initial } = require('lodash');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

// Export an empty object that will later store database models
module.exports = db = []

// Call the initialize function to set up the database
initialize();

async function initialize(){
    const{ host, port, user, password, database } = config.database;// Extract database credentials from config.json
    const connection = await mysql.createConnection({ host, port, user, password }); // Create a connection to MySQL server
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);// Connect to the newly created/existing database using Sequelize

    // Connect to the newly created/existing database using Sequelize
    const sequelize = new Sequelize(database, user, password, {dialect : 'mysql'});

    //init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);

    //sync all modes w/ db
    await sequelize.sync({ alter:true });

}