const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'CONTACTS',
    'root',
    null,
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: (msg) => console.log(msg),
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = sequelize;