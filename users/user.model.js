const { DataTypes } = require('sequelize');

// Export the model function
module.exports = model;

function model(sequelize) {
    // Define model attributes (table columns)
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },        // User email (required)
        passwordHash: { type: DataTypes.STRING, allowNull: false }, // Hashed password (required)
        title: { type: DataTypes.STRING, allowNull: false },        // User title
        firstname: { type: DataTypes.STRING, allowNull: false },    // First name (required)
        lastname: { type: DataTypes.STRING, allowNull: false },     // Last name (required)
        role: { type: DataTypes.STRING, allowNull: false }          // User role (admin, user, etc.)
    };

    // Define model options (default behaviors & scopes)
    const options = {
        defaultScope: {
            // By default, exclude the passwordHash field from query results
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // Custom scope to include passwordHash when explicitly requested
            withHash: { attributes: {} }
        }
    };

    // Define and return the User model
    return sequelize.define('User', attributes, options);
}
