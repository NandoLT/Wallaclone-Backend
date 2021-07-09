'use strict'

// libraries requires
const mongoose = require('mongoose');

// local requires
const { FillByFilters } = require('../data/advertsFinders');

const advertSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    status: {
        type: Number,
        index: true
    },
    price: {
        type: Number,
        index: true
    },
    photo: String,
    tags: {
        type: Array,
        index: true
    }
});

// Enum for status
const statusEnum = {
    0: "On Sale",
    1: "Wanted",
    2: "Reserved",
    3: "Sold"
};

// get adverts by filters
advertSchema.statics.fillByFilters = async function (name, status, price, tag, skip, limit, sort) {
    const filters = await FillByFilters(name, status, price, tag, skip, limit, sort);

    const query = Ad.find(filters);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    return query.exec();
};

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;