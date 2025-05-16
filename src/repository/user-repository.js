const { User , Role} = require('../models/index');

class UserRepository{

    async create(data){
        try{
            const user = await User.create(data);
            return user;
        } catch (error){
            console.log("Somthing went wrong at repostiroy layer");
            throw error;
        }
    }

    async destroy(userId){
        try{
            await User.destroy({
                where : {
                    id: userId
                }
            });
        } catch (error){
            console.log("Somthing went wrong at repostiroy layer");
            throw error;
        }
    }

    async getById(userId){
        try{
            const user = await User.findByPk(userId , {
                attributes : ['email' , 'id']
            });
            return user;
        } catch (error){
            console.log("Somthing went wrong at repostiroy layer");
            throw error;
        }
    }

    async getByEmail(UserEmail){
        try{
            const user = await User.findOne({
                where : {
                    email: UserEmail
                }
            }); 
            return user;
        } catch (error){
            console.log("Somthing went wrong at repostiroy layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where : {
                    name: 'ADMIN'
                }
            });
            if(!user){
                throw {error: "User not found"};
            }
            return user.hasRole(adminRole);
        } catch (error){
            console.log("Somthing went wrong at repostiroy layer");
            throw error;
        }
    }


}

module.exports = UserRepository;