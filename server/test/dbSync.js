import models from '../models'
class DBSync
{
 	static clearDatabase()
 	{
		before((done) => {
			models.sequelize.sync({force: true})
			.then(() => {
				done(null);
			})
			.catch(error => {
				done(error);
			})
		})
	}
}
export default DBSync
