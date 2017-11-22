import ValidationService from '../services/ValidationService';
const error = new Error();

export default (sequelize, DataTypes) => {
    const Center = sequelize.define('Center', {
        centerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Center name cannot be empty!'
                },
                isValidCenterName: (value) => {       
                    if(!ValidationService.isValidName(value)) {    
                        error.message = 'Center name can only contain letters, numbers and these characters -,\'';
                        throw error;
                    }
                }
            },
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Capacity cannot be empty!'
                },
                isInt: {
                    args: true,
                    msg: 'Invalid entry for capacity, must be an integer!'
                },
            },
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Price cannot be empty!'
                },
                isValidPrice: (value) => {
                    if(!ValidationService.isValidCurrency(value)) {
                        error.message = 'Invalid entry for price, must be numeric!'
                        throw error;
                    }
                }
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Location cannot be empty!'
                },
                isValidLocation: (value) => {
                    if (!ValidationService.isAlphabetic(value)) {
                        error.message = 'Location can only contain letters!'
                        throw error;
                    }
                }
            }
        },  
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Address cannot be empty!'
                },
                isValidAddress: (value) => {
                    if (!ValidationService.isString(value)) {
                        error.message = 'Invalid entry for address, must be in word(s)!'
                        throw error;
                    }
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Description cannot be empty!'
                },
                isValidDescription: (value) => {
                    if (!ValidationService.isString(value)) {
                        error.message = 'Please, enter a valid description!'
                        throw error;
                    }
                }
            }
        },
        availability: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Availability cannot be empty!'
                },
                isBool: (value) => {
                    if(!ValidationService.isBoolean(value)) {
                        error.message = 'Please, enter true or false for availability';
                        throw error;
                    }
                },
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                is: {
                    args: /^[1-9]+$/,
                    msg: 'Requires a positive integer value'
                },
            },
        },   
    })
    Center.associate = (models) => {
        Center.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
        });
        Center.hasMany(models.Event, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
        });
    };
    return Center;
};