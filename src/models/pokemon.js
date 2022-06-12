const {ignore} = require("nodemon/lib/rules");
module.exports = (sequelize, DataTypes) => {
    const typesPokemon = ['Normal', 'Vol', 'Eau', 'Poison', 'Fée', 'Feu', 'Electrik','Insecte', 'Plante','fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            //Contraint 👇
            unique: {
                args: true,
                msg: 'This name is already used'
            },
            validate: {
                notEmpty: {msg: 'name must have a name'},
                notNull: {msg: 'name must have a name'},

            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'hp must be an integer'},
                notNull: {msg: 'Les point de vie sont une propriété obligatoire'},
                min: {args: [0], msg: 'Les point de vie ne peuvent pas être négatifs'},
                max: {args: [100], msg: 'Les point de vie ne peuvent pas être supérieurs à 100'}
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'cp must be an integer'},
                notNull: {msg: 'Les points de combat sont une propriété obligatoire'},
                min: {
                    args: [0],
                    msg: 'Les points de combat doivent être supérieur à 0'
                },
                max: {
                    args: [9999],
                    msg: 'Les points de combat doivent être inférieur à 9999'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {
                    args: true,
                    msg: 'picture must be a valid url'
                },
                notNull: {msg: 'picture must not be empty'},
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if (!value) {
                        throw new Error('Un pokémon doit avoir au moins un type')
                    }
                    if (value.split(',').length > 3) {
                        throw new Error('Un pokémon ne peut avoir plus de 3 types')
                    }

                    value.split(",").forEach(type => {
                        if (!typesPokemon.includes(type)) {
                            console.log(!typesPokemon.includes(type))
                            throw new Error(`Le type de pokémon doit appartenir à la liste suivante : ${typesPokemon}`)
                        }
                    })
                }
            }
        }
    }, {
        validate: {
            // bothCpAndHp() {
            //     if (this.hp < 0 || this.hp > 999) {
            //         throw new Error('hp must be between 0 and 999')
            //     }
            //     if (this.cp < 0 || this.cp > 99) {
            //         throw new Error('cp must be between 0 and 99')
            //     }
            // }
        },
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}