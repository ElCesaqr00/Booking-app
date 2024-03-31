const { getAll, create, remove } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require("../utils/verifyJWT")

const imageRouter = express.Router();

imageRouter.route('/images')
    .get(verifyJWT, getAll)
    .post(verifyJWT,upload.single("image"), create)

imageRouter.route("/images/:id")
    .delete(verifyJWT, remove)


module.exports = imageRouter;