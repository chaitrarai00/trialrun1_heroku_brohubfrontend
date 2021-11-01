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

    // we try to build associations here and models here in the function grabs control over every model in the table
    Posts.associate= (models) => {
        // a post can have many comments
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
            //delete comments associated on delete of a post
        });
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
            //delete likes associated on delete of a post
        });
    }

    return Posts;
}

// This is where you create the posts table 