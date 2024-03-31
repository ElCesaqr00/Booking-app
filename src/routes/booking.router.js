const { getAll, create, getOne, remove, update } = require('../controllers/booking.controllers');
const express = require('express');
const VerifyJWT = require("../utils/verifyJWT")

const bookingRouter = express.Router();

bookingRouter.route('/bookings')
    .get(VerifyJWT, getAll)
    .post(VerifyJWT, create);

bookingRouter.route('/bookings/:id')
    .get(getOne)
    .delete(VerifyJWT, remove)
    .put(VerifyJWT, update);

module.exports = bookingRouter;