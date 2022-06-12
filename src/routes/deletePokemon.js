const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')


module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth,(req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = 'Ce pokémon n\'existe pas.'
                    return res.status(404).json({ message })
                }
            const pokemonDeleted = pokemon;
           return Pokemon.destroy({
                where: { id: pokemon.id }
            })
                .then(_ => {
                    const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                    res.json({message, data: pokemonDeleted })
                })
        })
            .catch((err) => {
                const message = `le pokémon n'a pu étre supprimé. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
    })
}