'use strict'

// libraries requires
const mongoose = require('mongoose');

// local requires
const FillByFilters = require('../data/advertsFinders/advertsFillByFilters');

const advertSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    description: String,
    status: {
        type: Number,
        index: true
    },
    price: {
        type: Number,
        index: true
    },
    province: String,
    photo: {
        type: Array
    },
    tags: {
        type: Array,
        index: true
    },
    userId: {
        type: String,
        index:true
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
advertSchema.methods.fillByFilters = async function (name, status, minPrice, maxPrice, tags, province, skip, limit, sort) {
    const filters = await FillByFilters(name, status, minPrice, maxPrice, tags, province);
    
    const query = Advert.find(filters);
    query.limit(parseInt(limit));
    query.skip(parseInt(skip));
    query.sort(sort);
    return query.exec();
};

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;