'use strict';

async function FillByFilters(name, status, minPrice, maxPrice, tags) {
    const filter = {};

    if (name) {
        const regex = name
        filter.name = { $regex: regex, $options: 'i' }
    }


    if (status) {
        filter.status = status
    }

    if (minPrice && !maxPrice) {
        filter.price = { $gte: parseFloat(filterPrice) }
    } else if (!minPrice && maxPrice) {
        filter.price = { $lte: parseFloat(filterPrice) }
    } else if (minPrice && maxPrice) {
        filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }
    }

    if (tags) {
        filter.tags = tags
    }

    return filter;
};

module.exports = FillByFilters