module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'This name is already used'
            },
            validate: {
                // notNull: {msg: 'Vous devez renseigner un nom d\'utilisateur'},
                min: {args: [4], msg: 'Entrée un nom d\'utilisateur valide (minimum 4 caractères et maximum 30)'},
                max: {args: [30], msg: 'Entrée un nom d\'utilisateur valide (minimum 4 caractères et maximum 30)'}
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                // is: /^[0-9a-f]{64}$/i,
                // notNull: {msg: 'Vous devez renseigner un mot de passe'},
                min: {args: [4], msg: 'Entrée un mot de passe valide (minimum 4 caractères et maximum 30)'},
                max: {args: [30], msg: 'Entrée un mot de passe valide (minimum 4 caractères et maximum 30)'}
            }
        }
    })
}