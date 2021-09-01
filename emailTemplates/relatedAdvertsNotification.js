require('dotenv');

module.exports = (adverts) => {
    let tableAdvertsRelated = [];
    if (adverts.length > 0) {
            tableAdvertsRelated = adverts.map(advert => {
            return( 
            `<tr style="border-bottom: 1px solid #ddd;">
                <th><a href=${process.env.URL_BASE_FRONT}/adverts/${advert.name}/${advert._id}>${advert.name}</a></th>
                <th>${advert.description}</th>
                <th>${advert.price}</th>
            </tr>`
            );
            
        });

        return (
        `<div>
            <hr>
            <h1>Related Adverts</h1>
            <p>The next adverts are related with your preferences</p>
            <hr>
            <table style="border-collapse: collapse;width: 100%;">
                <tr style="border-bottom: 1px solid #ddd;">
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
                ${tableAdvertsRelated}
            </table>
            <br>
        </div>`);
    } else {
        return ('');
    }
}