const express = require('express');
const userRouter = require('./user.router');
const hotelRouter = require('./hotel.router');
const cityRouter = require('./city.router');
const imageRouter = require('./image.router');
const reviewRouter = require('./review.router');
const bookingRouter = require('./booking.router');
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter)
router.use(hotelRouter)
router.use(cityRouter)
router.use(imageRouter)
router.use(reviewRouter)
router.use(bookingRouter)

module.exports = router;