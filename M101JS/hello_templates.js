const express = require('express'),
    app = express(),
    engines = require('consolidate')

app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', './views')


app.use((req, res) => res.render('hello', { 'name': 'Templates' }))

const server = app.listen(3000, () => {
    const port = server.address().port
    console.log('Express server listening on port', port)
})