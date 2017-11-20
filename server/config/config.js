require('dotenv/config');
/**
 * Extract configs from env
 */
const {
    //Cofigurations for development
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_DIALECT,
   
    //Configurations for test
    DB_USERNAME_TEST,
    DB_PASSWORD_TEST,
    DB_NAME_TEST,
    DB_HOST_TEST,
    DB_DIALECT_TEST,
} = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: DB_DIALECT,
  },
    test: {
        username: DB_USERNAME_TEST,
        password: DB_PASSWORD_TEST,
        database: DB_NAME_TEST,
        host: DB_HOST_TEST,
        dialect: DB_DIALECT_TEST,
        logging: false,
    },  
    production: {
        use_env_variable: 'URL',
        dialect: 'postgres'
    }
}