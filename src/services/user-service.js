const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    async signIn(email , plainpassword){
        try{
            // step 1 -> Fetch the user based on email
            const user = await this.userRepository.getByEmail(email);
            // step 2 -> compare the incoming plain password with the encrypted password
            const passwordMatch = this.checkPassword(plainpassword , user.password);

            if(!passwordMatch){
                console.log("Password is incorrect");
                throw {error: "Password is incorrect"};
            }

            // step 3 -> create a token and send it to the user
            const newJWT = this.createToken({id: user.id , email: user.email});
            return newJWT;
        }
        catch (error){
            console.log("Somthing went wrong at repostiroy layer");
            throw error;
        }
    }

    async isAuthenticated(token){
        try{
            // step 1 -> verify the token
            const isTokenVerified = this.verifyToken(token);

            if(!isTokenVerified){
                throw {error: "Token is not verified"};
            }

            const user = this.userRepository.getById(isTokenVerified.id);
            if(!user){
                throw {error: "User not found"};
            }
            return user.id;
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
    
    
    checkPassword(userInputPlainPassword , encryptedPassword){
        try{
            const result = bcrypt.compareSync(userInputPlainPassword , encryptedPassword);
            return result;
        } catch (error){
            console.log("Somthing went wrong at password verification");
            throw error;
        }
    }

    isAdmin(userId){
        try{
            return this.userRepository.isAdmin(userId);
        } catch (error){
            console.log("Somthing went wrong at repostiroy layer");
            throw error;
        }
    }
}

module.exports = UserService;