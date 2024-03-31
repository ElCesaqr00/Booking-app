const catchError = require("../utils/catchError");
const Image = require("../models/Images");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary")

const getAll = catchError(async(req, res) => {
    const image = await Image.findAll();
    return res.json(image)
});

const create = catchError(async(req, res) => {
    const file = req.file;
    const { url } = await uploadToCloudinary(file);
    const { hotelId } = req.body
    const image = await Image.create({ url, hotelId });
    return res.status(201).json(image);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const images = await Image.findByPk(id);
    await deleteFromCloudinary(images.url);
    await images.destroy();
    return res.sendStatus(204)
})
module.exports = {
    getAll,
    create,
    remove
}