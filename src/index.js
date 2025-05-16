const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const db = require('./models/index');
const { User , Role } = require('./models/index');

const app = express();

// const { User } = require('./models/index');
// const bcrypt = require('bcrypt');
// const UserRepository = require('./repository/user-repository');
// const UserService = require('./services/user-service');

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api' , apiRoutes);

    app.listen(PORT , async () => {
        console.log(`Server Started on Port : ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }

        const u1 = await User.findByPk(4);
        const r1 = await Role.findByPk(2);
        // u1.addRole(r1);

        // const response = await u1.getRoles();
        const response = await r1.getUsers();
        console.log("response is : " , response);

        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        // console.log(response);

        const incomingPassword = '123456';

        // const user = await User.findByPk(3);
        // const resp onse = bcrypt.compareSync(incomingPassword , user.password);
        // console.log(response);

        // const service = new UserService();
        // const newToken = service.createToken({id: 1 , email: 'deepesh@admin.com'});
        // console.log("new token is : " , newToken);  
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZWVwZXNoQGFkbWluLmNvbSIsImlhdCI6MTc0NzIwNTAxMywiZXhwIjoxNzQ3MjA4NjEzfQ.cu_syMUHY0pQbz4i8sO1qJ-memXjVzXfVqywoBzeoxc';
        // const response = service.verifyToken(token);
        // console.log("response is : " , response);




    })
}

prepareAndStartServer();