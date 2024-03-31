const Booking = require("./Booking");
const City = require("./City");
const Hotel = require("./Hotel");
const Images = require("./Images");
const Review = require("./Review");
const Users = require("./Users");


Hotel.belongsTo(City);
City.hasMany(Hotel);

Images.belongsTo(Hotel);
Hotel.hasMany(Images);

Users.hasMany(Booking);
Booking.belongsTo(Users);

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

Users.hasMany(Review);
Review.belongsTo(Users);

Hotel.hasMany(Review);
Review.belongsTo(Hotel);