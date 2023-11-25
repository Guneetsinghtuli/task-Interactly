
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Assuming you have a separate file for configuring the database connection

const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
    tableName: 'contacts',
    timestamps: false

});

Contact.sync({force: true}).then(() => {
    console.log('table created');
});

module.exports = Contact;
