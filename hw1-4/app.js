const express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// Handler for internal server errors
function errorHandler(err, req, res) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', (req, res) => {
        res.render('add_movie', {});
    });

    app.post('/add_movie', (req, res, next) => {
        const title = req.body.title;
        const year = req.body.year;
        const imdb = req.body.imdb;

        if ((title == '') || (year == '') || (imdb == '')) {
            next('Please provide an entry for all fields.');
        } else {
            db.collection('movies').insertOne(
                { title, year, imdb }, (err, r) => {
                    assert.equal(null, err);
                    res.send("Document inserted with _id: " + r.insertedId);
                }
            );
        }
    });

    app.use(errorHandler);

    const server = app.listen(3000, () => {
        const port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});
