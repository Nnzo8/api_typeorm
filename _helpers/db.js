const config = require('config.json');
const { initial } = require('lodash');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = []

initialize();

async function initialize(){
    //create db if not existing
    const{ host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    //connects to db
    const sequelize = new Sequelize(database, user, password, {dialect : 'mysql'});

    //init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);

    //sync all modes w/ db
    await sequelize.sync({ alter:true });

}