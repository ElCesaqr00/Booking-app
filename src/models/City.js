const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const City = sequelize.define('city', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId: {
        type: DataTypes.STRING,
        allowNull: false
        //identificador de pais abreviado ej: colombia = CO   mexico= MX
    },
});

module.exports = City;