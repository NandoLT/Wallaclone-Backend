require('dotenv');

module.exports = (adverts) => {

    const tableAdverts = () => {
        adverts.forEach(advert => {
            `<tr>
                <th><ahref=${process.env.URL_BASE_FRONT}/adverts/${advert._id}>${advert.name}</a></th>
                <th>${advert.description}</th>
                <th>${advert.price}</th>
            </tr>`
        });
    }

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
            ${tableAdverts}
        </table>
        <br>
    </div>`);
}