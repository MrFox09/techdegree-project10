const Sequelize = require('sequelize');

 
module.exports = (sequelize) => {
 
    class User extends Sequelize.Model {}
    User.init({

        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        firstName:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty:{
                    msg: 'First Name can not be empty'
                }
            }
        },

        lastName:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty:{
                    msg: 'Last Name can not be empty'
                }
            }
        },

        emailAddress:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty:{
                    msg: 'Email Adress can not be empty'
                },
                isEmail: {
                    msg: 'Please enter a valid email (eg. name@email.com)'
                },
 
            }
        },

        password:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty:{
                    msg: 'Password can not be empty'
                },
                notNull: {
                    msg: 'Password can not be empty'
                }
            }
        
        }



    }, {sequelize});

    //Define the asscociation with the Course model
    User.associate = (models) => {

        User.hasMany(models.Course,
            {
                as: 'owner', 
                foreignKey: {
                    fieldName: 'userId', 
                    allowNull:false                   
                }     
                    
        
            });
    };
 
    return User;
 
};