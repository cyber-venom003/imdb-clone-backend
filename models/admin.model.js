const {Sequelize , DataTypes} = require('sequelize')

module.exports = (sequelize , DataTypes) => {
    const admin = sequelize.define('Admin' , {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    } , {timestamps: false});

    return admin;
}
