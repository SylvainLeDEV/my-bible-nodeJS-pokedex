const {Sequelize, DataTypes} = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user');
const pokemons = require('./mock-pockemons');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    port: 3307,
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: false
})

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            })
            // .then(() => console.log(
            //     pokemon.toJSON(),
            // ))
        })
        bcrypt.hash('admin', 10).then(hash => {
            User.create({
                username: 'admin',
                password: hash,
            })
        })
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon, User
}