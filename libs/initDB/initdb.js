const { mongoose, connectMongoose, User } = require('../../models');

const fs = require('fs')
const data = fs.readFileSync((__dirname + '/users.json'), 'utf8')
const dataParse = JSON.parse(data)

async function  dropChargeBd(){
    if(User){
        try {
            await User.deleteMany()
            console.log('Collection deleted')
            await User.insertMany(dataParse)
            console.log("Data inserted")
            console.log("Closing DB Conecction...")
            mongoose.connection.close()
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            await User.insertMany(dataParse)
            console.log("Data inserted")
        } catch(err) {
            console.log(err)
        }
    }
}

dropChargeBd()