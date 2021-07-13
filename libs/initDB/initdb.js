const { mongoose, connectMongoose, User, Advert } = require('../../models');

const fs = require('fs');
const userData = fs.readFileSync((__dirname + '/users.json'), 'utf8');
const userDataParse = JSON.parse(userData);
const advertData = fs.readFileSync((__dirname + '/adverts.json'), 'utf8');
const advertDataParse = JSON.parse(advertData);

async function  dropChargeBd(){
    if(User) {
        try {
            await User.deleteMany();
            console.log('Collection deleted');
            await User.insertMany(userDataParse);
            console.log("Data inserted");
            console.log("Closing DB Conecction...");
            // mongoose.connection.close();
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            await User.insertMany(userDataParse);
            console.log("Data inserted");
        } catch(err) {
            console.log(err);
        }
    }

    if(Advert) {
        try {
            await Advert.deleteMany();
            console.log('Collection deleted');
            await Advert.insertMany(advertDataParse);
            console.log("Data inserted");
            console.log("Closing DB Conecction...");
            // mongoose.connection.close();
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            await User.insertMany(advertDataParse);
            console.log("Data inserted");
        } catch(err) {
            console.log(err);
        }
    }
}

dropChargeBd()