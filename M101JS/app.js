const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

MongoClient.connect('mongodb://localhost/video', function (err, db) {
    assert.equal(null, err)

    console.log("Sucessfully connected to server")

    db.collection('movies').find({}).toArray(function (err, docs) {
        docs.forEach(function (doc) {
            console.log(doc)
        })
        db.close()
    })
    console.log("Called find()")
})