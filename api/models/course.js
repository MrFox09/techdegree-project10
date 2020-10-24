const Sequelize = require('sequelize');
 
module.exports = (sequelize) => {
 
    class Course extends Sequelize.Model {}
    Course.init({

 

        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },


        title:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:  {
                notEmpty:{
                    msg: 'Title can not be empty'
                },
                notNull: {
                    msg: 'Title can not be empty'
                }
            }
        },

        description:{
            type:Sequelize.TEXT,
            allowNull:false,
            validate:  {
                notEmpty:{
                    msg: 'Description can not be empty'
                },
                notNull: {
                    msg: 'Description can not be empty'
                }
            }
        },

        estimatedTime:{
            type:Sequelize.STRING,
            allowNull:true,
            validate:  {
                notEmpty:{
                    msg: ' Estimated Time can not be empty'
                },
            }
            
        },

        materialsNeeded:{
            type:Sequelize.STRING,
            allowNull:true,
            validate:  {
                notEmpty:{
                    msg: 'Password can not be empty'
                },
            }
        },



    }, {sequelize});


    //Define the asscociation with the User model

    Course.associate = (models) => {

        Course.belongsTo(models.User,
            {
                as: 'owner', 
                foreignKey: {
                    fieldName: 'userId',  
                    allowNull: false                  
                }     
                    
        
            });
    };
 
    return Course;
 
};
