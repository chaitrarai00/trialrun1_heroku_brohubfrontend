module.exports = (sequelize, DataTypes) => {

    const Posts= sequelize.define("Posts",{
        // set the columns/ attributes as objects
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Posts;
}

// This is where you create the posts table 