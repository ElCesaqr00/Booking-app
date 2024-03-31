const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Booking = sequelize.define('booking', {
    checkIn: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    checkOut: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

module.exports = Booking;