const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons/:id', auth,(req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = 'Ce pokémon n\'existe pas.'
                    res.status(404).json({ message })
                }
                const message = 'Un pokémon a bien été trouvé.'
                res.json({ message, data: pokemon })
            })
            .catch((err) => {
                const message =`La liste des pokémont n'a pu étre récuperer. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
    })
}