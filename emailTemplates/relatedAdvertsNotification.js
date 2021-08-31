require('dotenv');

module.exports = (adverts) => {

        const tableAdvertsRelated = adverts.map(advert => {
            console.log('ADVERT SIMPLE',advert);
            return( 
            `<tr>
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
        <table>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
            </tr>
            ${tableAdvertsRelated}
        </table>
        <br>
    </div>`);
}