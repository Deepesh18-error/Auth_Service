const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();

const { User } = require('./models/index');
const bcrypt = require('bcrypt');

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api' , apiRoutes);

    app.listen(PORT , async () => {
        console.log(`Server Started on Port : ${PORT}`);

        const incomingPassword = '123456';
        // const user = await User.findByPk(3);
        // const response = bcrypt.compareSync(incomingPassword , user.password);
        // console.log(response);
    })
}

prepareAndStartServer();