module.exports = (advert) => {
    if(advert.status === 2) {
        advert.status = 'Reserved';
    } else {
        advert.status = 'Sold'
    }
    return (
    `<div>
        <h1>Wallaclone Notifications System</h1>
        <p>The next advert's status has been modified.<br>
        It's include into your favorite list, please contact with the vendor if you are still interested.</p>
        <br />
        <hr>
        <h2> ${advert.status} </h2>
        <h3> ${advert.name} </h3>
        <h4> ${advert.description} </h4>
        <h4> ${advert.price} € </h4>
        <h4> ${advert.province} </h4>
        <hr>
        <br>
    </div>`);
}