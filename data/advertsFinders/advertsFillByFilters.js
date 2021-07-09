'use strict';

export async function FillByFilters(name, status, price, tag, skip, limit, sort) {
    const filtro = {};

    if (name) {
        const regex = name
        filtro.name = { $regex: regex, $options: 'i' }
    }


    if (status) {
        filtro.status = status
    }


    if (price) {
        if (!price.toString().includes('-')) {
            filtro.price = price
        }
        else {
            const position = price.indexOf('-');
            const split = price.split('-');
            if (split[0] == '') {
                const filterPrice = split[1];
                filtro.price = { $lte: parseFloat(filterPrice) }
            }
            else if (split[1] == '') {
                const filterPrice = split[0];
                filtro.price = { $gte: parseFloat(filterPrice) }
            }
            else {
                const minPrice = split[0];
                const maxPrice = split[1];
                filtro.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }
            }
        }
    }

    if (tag) {
        filtro.tags = tag
    }

    return filtro;
};