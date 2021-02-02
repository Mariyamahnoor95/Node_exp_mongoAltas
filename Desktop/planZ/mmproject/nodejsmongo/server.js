const express = require('express')
const app = express()
const mongoose = require("mongoose")
const {MongoClient} = require('mongodb')

async function main(){
 
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    try {
        await client.connect();
        // await listDatabases(client);
        console.log("connected")
    } catch(e){
        console.log(e)
    }
}
main().catch(console.err)


// async function listDatabases(client){
//     const databasesList =  await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.foreach (db=> console.log(` -${db.name}`));
// }
// require('./model/post') 

app.listen(3001, ()=>{
console.log("server is running on port 3001 ")
})
