module.exports = (advert, relatedTemplate) => {

    relatedTemplate ? relatedTemplate : '';
    return (
    `<div>
        <h1>Wallaclone Notifications System</h1>
        <p>The next advert's price has been modified.<br>
        It's include into your favorite list, please contact with the vendor if you are still interested.</p>
        <br />
        <hr>
        <h3> ${advert.name} </h3>
        <h4> ${advert.description} </h4>
        <h4> ${advert.price} € </h4>
        <h4> ${advert.province} </h4>
        <hr>
        ${relatedTemplate}
        <br>
    </div>`);
}