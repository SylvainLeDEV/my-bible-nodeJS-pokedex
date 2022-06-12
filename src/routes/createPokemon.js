const { Pokemon } = require('../db/sequelize');
const {ValidationError, UniqueConstraintError} = require("sequelize");
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/pokemons', auth,(req, res) => {
    console.log("test")
        console.log(req.body)
        Pokemon.create(req.body)
            .then(pokemon => {
                   const message = 'Un pokémon a bien été créé.'
                    res.json({ message, data: pokemon })
            })
            .catch((err) => {
                if(err instanceof ValidationError) {
                    res.status(400).json({ message: err.message, data: err })
                }
                if(err instanceof UniqueConstraintError) {
                    res.status(400).json({ message: err.message, data: err })
                }
                const message =`La liste des pokémont n'a pu étre ajouté. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })

    })
}