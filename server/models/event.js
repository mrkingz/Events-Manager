import ValidationService from '../services/ValidationService';
const error = new Error();

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Event title cannot be empty!'
                    },
                    isValidCenterName: (value) => {       
                        if(!ValidationService.isValidName(value)) {    
                            error.message = 'Event title can only contain letters, numbers and these characters -,\'';
                            throw error;
                        }
                    }
                },
            },
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Event date cannot be empty!'
                },
            }
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Event time cannot be empty!'
                },
            },
        },
        estimatedGuests: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Estimated guest cannot be empty!'
                },
                isInt: {
                    args: true,
                    msg: 'Estimated guests must be an integer value'
                },
            },
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
        approval: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                isBool: (value) => {
                    if(!ValidationService.isBoolean(value)) {
                        error.message = 'Please, enter true or false for approval';
                        throw error;
                    }
                },
            },            
        },
        centerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                is: {
                    args: /^[1-9]+$/,
                    msg: 'Requires a positive integer value'
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
    });

    Event.associate = (models) => {
        Event.belongsTo(models.Center, {
            foreignKey: {
                name: 'centerId',
                allowNull: false,
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
        });
        Event.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        });
    }
    return Event;
};