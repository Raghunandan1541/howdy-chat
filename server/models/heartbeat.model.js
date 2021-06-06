const redisClient = require('./../config/redis');

const addUsersToListRedis = (key, subKey, value, cb) => {
	redisClient.HMSET(key, subKey, JSON.stringify(value), (err, res) => {
		return cb(err, res);
	});
};

const removeUsersFromListRedis = (key, subKey) => {
	redisClient.HDEL(key, subKey);
};

const getOfflineUserInfo = (key, subKey, cb) => {
	redisClient.HGET(key, subKey, (err, res) => {
		cb(err, res);
	});
};

module.exports = {
	addUsersToListRedis,
	removeUsersFromListRedis,
	getOfflineUserInfo,
};
