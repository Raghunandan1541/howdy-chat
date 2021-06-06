const MONGO_DB = require('mongodb');
const MongoClient = MONGO_DB.MongoClient;
const url = process.env.MONGO_URL;

try {
	const M_CONNECT = MongoClient.connect(url, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	module.exports = { MONGO_DB, M_CONNECT };
} catch (err) {
	console.log(err);
}
