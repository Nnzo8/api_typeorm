import { createConnection, Connection } from 'typeorm';
const config = require('./config.json');
import * as mysql from 'mysql2/promise';
import { User } from '../users/user.model';

// Export an empty object that will later store database models
const db: any = {};
export default db;

// Call the initialize function to set up the database
initialize();

async function initialize(): Promise<void> {
    const { host, port, user, password, database } = config.database; // Extract database credentials from config.json
    const connection = await mysql.createConnection({ host, port, user, password }); // Create a connection to MySQL server
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`); // Create the database if it doesn't exist
    
    try {
        // Connect to the database using TypeORM
        const typeormConnection = await createConnection({
            type: 'mysql',
            host,
            port,
            username: user,
            password,
            database,
            entities: [
                User
            ],
            synchronize: true, // This is equivalent to sequelize.sync({ alter: true })
        });
        
        // Add models to the exported db object
        db.User = User;
        
    } catch (error) {
        console.error('TypeORM connection error:', error);
        throw error;
    }
}