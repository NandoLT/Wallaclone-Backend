require('../../models/connectMongoose');
const mongoose = require('mongoose')
const Users = require('../../models')

const fs = require('fs')
const data = fs.readFileSync((__dirname + '/productos.json'), 'utf8')
const dataParse = JSON.parse(data)

async function  dropChargeBd(){
    if(Users){
        try {
            await Users.deleteMany({})
            console.log('Collection deleted')
            await Users.insertMany(dataParse)
            console.log("Data inserted")
            console.log("Closing DB Conecction...")
            mongoose.connection.close()
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            await Users.insertMany(dataParse)
            console.log("Data inserted")
        } catch(err) {
            console.log(err)
        }
    }
}

dropChargeBd()