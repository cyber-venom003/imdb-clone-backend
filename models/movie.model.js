const {Sequelize , DataTypes} = require('sequelize')

module.exports = (sequelize , DataTypes) => {
    const movie = sequelize.define('Movie' , {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year_of_release: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        plot: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: false
        }
    } , {timestamps: false});
    return movie;
}