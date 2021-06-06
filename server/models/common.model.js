const { MONGO_DB, M_CONNECT } = require('./../config/mongoDB');

const userLogin = async (payload) => {
	const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
	let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION);
	let res = await collection.insertOne(payload);
	return res.insertedId;
};

const getUsersList = async (sessionId) => {
	const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
	let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION);
	let res = await collection
		.find({ sessionId: { $ne: sessionId } })
		.toArray();
	return res;
};

const getUserInfo = async (sessionId) => {
	const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
	let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION);
	let res = await collection.findOne({ sessionId: sessionId });
	return res;
};

const getUserChats = async (senderId, receiverId) => {
	const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
	let collection = await db.collection(process.env.MONGO_DB_CHATS_COLLECTION);
	let res = await collection
		.find({ room: { $all: [senderId, receiverId] } })
		.toArray();
	return res;
};

const saveChats = async (payload) => {
	const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
	let collection = await db.collection(process.env.MONGO_DB_CHATS_COLLECTION);
	let res = await collection.insertOne(payload);
	return res.insertedId;
};

module.exports = {
	userLogin,
	getUsersList,
	getUserInfo,
	getUserChats,
	saveChats,
};
