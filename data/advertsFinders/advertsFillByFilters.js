'use strict';

async function FillByFilters(name, status, minPrice, maxPrice, tags, province) {
    const filter = {};

    if (name) {
        const regex = name
        filter.name = { $regex: regex, $options: 'i' }
    }


    if (status) {
        filter.status = parseInt(status)
    }

    if (minPrice && !maxPrice) {
        filter.price = { $gte: parseFloat(minPrice) }
    } else if (!minPrice && maxPrice) {
        filter.price = { $lte: parseFloat(maxPrice) }
    } else if (minPrice && maxPrice) {
        filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }
    }

    if (tags) {
        filter.tags = { $in: tags }
    }

    if (province) {
        filter.province = province;
    }

    return filter;
};

module.exports = FillByFilters