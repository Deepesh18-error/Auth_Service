const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../config/serverConfig');
const UserRepository = require('../repository/user-repository');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user;
        } catch (error){
            console.log("Somthing went wrong at repostiroy layer");
            throw error;
        }
    }

    createToken(user){
        try{
            const result = jwt.sign(user , JWT_KEY , {expiresIn : '1d'});
            return result;
        } catch (error){
            console.log("Somthing went wrong at token creation");
            throw error;
        }
    }

    verifyToken(token){
        try{
            const result = jwt.verify(token , JWT_KEY);
            return result;
        } catch (error){
            console.log("Somthing went wrong at token verification");
            throw error;
        }
    }   
}

module.exports = UserService;