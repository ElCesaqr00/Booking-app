const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Images = sequelize.define('images', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
}
);

module.exports = Images;