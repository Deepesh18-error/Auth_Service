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
}

module.exports = UserService;