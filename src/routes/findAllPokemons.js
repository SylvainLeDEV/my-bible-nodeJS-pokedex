const {Pokemon} = require('../db/sequelize')
const {Op} = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth,(req, res) => {



        if (req.query.name) {
            const name = req.query.name
            console.log(name)
            const limit = parseInt(req.query.limit) || 5
            console.log(limit)

            if (name.length <= 2) {
                const message = ' Vous devez écrire plus de deux caractère pour effectuer une requête name Ex : ?name= Bu'
                return res.status(400).json({ message })
            }

            return Pokemon.findAndCountAll({
                where: {
                    name: { // Name est la propriété du modele pokémon
                        [Op.like]: `%${name}%` // 'name' est le critère de la recherche
                    }
                },
                order: ['name'],
                limit: limit
            })
                .then(({count, rows}) => {
                    const message = ` Il y a ${count} pokémons qui correspondent au terme recherche : ${name} `
                    res.json({message, data: rows})
                })

        } else {
            Pokemon.findAll({
                order: ['name'],
            })
                .then(pokemons => {

                    const message = 'La liste des pokémons a bien été récupérée.'
                    res.json({message, data: pokemons})
                })
                .catch((err) => {
                    const message = `La liste des pokémont n'a pu étre récuperer. Réessayez dans quelques instants.`
                    res.status(500).json({message, data: err})
                })
        }
    })
}