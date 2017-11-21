    import bcrypt from 'bcrypt';
    import ValidationService from '../services/ValidationService';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Email has been used'
        },
        validate: {
            notEmpty: {
            args: true,
            msg: 'Email is equired!'
            },
            isEmail: {
            args: true,
            msg: 'Invalid email address!'
            },
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Username is not available',
        },
        validate: {
            notEmpty: {
            args: true,
            msg: 'Username is required!'
            },
            len: {
            args: [3, 25],
            msg: 'Username must be between 3 to 25 characters long'
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
            args: true,
            msg: 'Password is required!',
            },
            len: {
            args: [8, 25],
            msg: 'Password must be at least 8 characters long'
            },
        },
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        validate: {
            notEmpty: {
            args: true,
            msg: 'Role cannot be empty'
            }
        }
    }
}, {
    hooks: {
        beforeCreate: (user, options) => {
            return bcrypt.hash(user.password, 10)
            .then((hash) => {
                user.password = hash;
                return user.password;
            })
        },

        beforeUpdate: (user, options) => {
            return bcrypt.hash(user.password, 10)
                .then((hash) => {
                    user.password = hash;
                    return user.password;
                })
            },
        },
    });
    
    User.associate = (models) => {
        User.hasMany(models.Center, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
            as: 'centers'
        })
    };

    return User;
};