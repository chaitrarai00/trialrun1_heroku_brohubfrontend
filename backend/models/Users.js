module.exports=(sequelize, DataTypes)=>{
    const Users= sequelize.define("Users",{
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Users.associate= (models)=>{
        //user can like many post
        Users.hasMany(models.Likes,{
            onDelete: "cascade",
        });
        //user can post many posts
        Users.hasMany(models.Posts,{
            onDelete: "cascade",
        });
    };
    return Users;
}
