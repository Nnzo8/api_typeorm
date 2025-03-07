import 'reflect-metadata'; 
import express from 'express';
import cors from 'cors';
import { errorHandler } from './_middleware/error-handler';
import { createConnection } from 'typeorm';
const config = require('./config.json');
import userRoutes from './users/users.controller';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/users', userRoutes);


// Global error handler - place this AFTER all routes
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
  });

// Set port
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

// Initialize database and start server
const { host, port: dbPort, user, password, database } = config.database;

createConnection({
    type: 'mysql',
    host,
    port: dbPort,
    username: user,
    password,
    database,
    entities: [
        __dirname + '/**/*.model.{js,ts}'
    ],
    synchronize: true,
    logging: true,
    charset: 'utf8mb4',
    connectTimeout: 30000,
    acquireTimeout: 30000,
    extra: {
        connectionLimit: 5
    }
})
.then(connection => {
    // Create database if it doesn't exist
    return connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``).then(() => {
        app.listen(port, () => {
            console.log('Database initialized and connected. Server listening on port ' + port);
        });
    });
})
.catch((error) => {
    console.error('TypeORM connection error:', error);
    // If database doesn't exist, try to create it
    if (error.errno === 1049) {
        console.log('Attempting to create database...');
        const tempConnection = new (require('mysql2')).createConnection({
            host,
            port: dbPort,
            user,
            password
        });
        tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``, (err: any) => {
            if (err) {
                console.error('Failed to create database:', err);
                process.exit(1);
            }
            console.log('Database created successfully');
            // Restart the application
            process.exit(0);
        });
    } else {
        process.exit(1);
    }
});