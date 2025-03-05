const { DataTypes } = require('sequelize');

module.exports = model; 

function model(sequelize){
    const attributes = {
        email: { type: Datatypes.STRING, allowNull: false},
        passwordHash: { type: Datatypes.STRING, allowNull: false },
        title: { type: Datatypes.STRING, allowNull: false },
        firstname: { type: Datatypes.STRING, allowNull: false },
        lastname: { type: Datatypes.STRING, allowNull: false },
        role:  { type: Datatypes.STRING, allowNull: false },
    };


const options = {
    defaultScope: {
        //exclude password hash by default
        attributes: { exclude: ['passwordHash']}
    },
    scopes: {
        //include hash with this scope
        withHash: { attributes: {}, }
    }
};
    return sequelize.define('User', attributes, options);
}   