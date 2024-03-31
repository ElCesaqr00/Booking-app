const catchError = require('../utils/catchError');
const Hotel = require('../models/Hotel');
const City = require('../models/City');
const { Op } = require("sequelize");
const Images = require('../models/Images');
const Review = require("../models/Review")

const getAll = catchError(async(req, res) => {
    const { cityId, name } = req.query;
    const where = {};

    if(cityId) where.cityId = cityId;
    if(name) where.name = { [Op.iLike]: `%${name}%`    }
    const results = await Hotel.findAll({
        include: [  City, Images, Review ],
        where: where,
    });
    const hotelWithRating = results.map( hotel => {
        const infoJson = hotel.toJSON();
        let sum = 0;
        infoJson.reviews.forEach(review => {
            sum += review.rating
            console.log(sum)
        });
        const ratingCount = infoJson.reviews.length;
        const average = ratingCount > 0 ? sum / ratingCount : 0;
        delete infoJson.reviews;
        return { ...infoJson, rating: average}
    })
    return res.json(hotelWithRating);
});

const create = catchError(async(req, res) => {
    const result = await Hotel.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotel.findByPk(id, { include: [ City, Images, Review]});
    if(!result) return res.sendStatus(404);
        const infoJson = result.toJSON();
        let sum = 0;
        infoJson.reviews.forEach(review => {
            sum += review.rating
            console.log(sum)
        });
        const ratingCount = infoJson.reviews.length;
        const average = ratingCount > 0 ? sum / ratingCount : 0;
        delete infoJson.reviews;
        return res.json({ ...infoJson, rating: average});
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Hotel.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotel.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}