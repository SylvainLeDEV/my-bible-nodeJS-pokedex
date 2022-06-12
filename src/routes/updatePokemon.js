const {Pokemon} = require('../db/sequelize');
const {ValidationError} = require("sequelize");
const {UniqueConstraintError} = require("sequelize");
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/pokemons/:id', auth,(req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: {id: id}
        })
            .then(() => {
                return Pokemon.findByPk(id)
                    .then(pokemon => {
                        console.log(typeof pokemon.hp)
                        if (pokemon === null) {
                            const message = 'Ce pokémon n\'a pas été trouvé pour être modifié.'
                             return res.status(404).json({message})
                        }
                        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
                        res.json({message, data: pokemon})
                    })

            })
            .catch((err) => {
                if(err instanceof ValidationError) {
                    res.status(400).json({ message: err.message, data: err })
                }
                if(err instanceof UniqueConstraintError) {
                    res.status(400).json({ message: err.message, data: err })
                }
                const message = `La liste des pokémont n'a pu étre modifié. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
    })
}