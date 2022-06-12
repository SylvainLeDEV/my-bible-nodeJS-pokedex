const express = require('express');
// const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = process.env.PORT || 3000;


app
    // .use(morgan('dev'))
    .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    .use(bodyParser.json())


sequelize.initDb();

require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

app.get('/test',(req,res,next) => {

    res.send('Hello heruko')

})

// Ajouter la gestion des erreurs 404
app.use(({res}) => {
    const message = "La page demandée n'existe pas.";
    res.status(404).json({ message });
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
