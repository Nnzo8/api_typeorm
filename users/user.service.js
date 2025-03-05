const bycrpt = require('bycrypt.js');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

//func for getting all users
async function getAll(){
    return await db.User.findAll();
}

//func for getting user by ID
async function getByID(id){
    return await getUser(id);
}

//func for creating and saving user
async function create(params) {
    //validate
    if(await db.User.findOne({ where: { email: params.email }})){
        throw 'Email "' + params.email + '" is already registered';
    }
    const user = new db.User(params);

    //hash password
    user.passwordHash = await bycrypt.hash(params.password, 10);

    //saves user
    await user.save()
}

//func for updating user by getting the ID
async function update(id, params){
    const user = await getUser(id);

    //validate
    const usernameChanged = params.username && user.username !== params.username;
    if(usernameChanged && await db.User.findOne({ where: { username: params.username }})){
        throw 'Username "' + params.username + '" is already taken';
    }
    //hash password if not yet entered
    if(params.password){
        params.passwordHash = await bycrpt.hash(params.password, 10);
    }
    //copy params to user and save
    Object.assign(user, params);
    await user.save();
}