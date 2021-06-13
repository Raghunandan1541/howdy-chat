import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import Messages from './server/dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';
import Groups from './server/groups.js';
import path from 'path';

const app = express();
const port = process.env.PORT || 4000;

const pusher = new Pusher({
	appId: process.env.PUSHER_APP_ID,
	key: process.env.PUSHER_KEY,
	secret: process.env.PUSHER_SECRET,
	cluster: process.env.PUSHER_CLUSTER,
	useTLS: true,
});

app.use(express.json());
app.use(cors());

const connection_url = process.env.MONGO_URL;

mongoose.connect(connection_url, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
	console.log('DB connected');

	const msgCollection = db.collection('msgcontents');
	const changeStream = msgCollection.watch();

	changeStream.on('change', (change) => {
		if (change.operationType === 'insert') {
			const msgDetails = change.fullDocument;
			pusher.trigger('messages', 'inserted', {
				name: msgDetails.name,
				message: msgDetails.message,
				timestamp: msgDetails.timestamp,
				received: msgDetails.received,
			});
		} else {
			console.log('Error triggering Pusher');
		}
	});

	const grpCollection = db.collection('grpcontents');
	const groupStream = grpCollection.watch();

	groupStream.on('change', (change) => {
		if (change.operationType === 'insert') {
			const grpDetails = change.fullDocument;
			pusher.trigger('groups', 'inserted', {
				name: grpDetails.name,
			});
		} else {
			console.log('Error triggering Pusher');
		}
	});
});

app.get('/', (req, res) => {
	res.status(200).sendFile(
		'Login.js',
		path.join(__dirname + '/client/src/components/Login'),
		(err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Sent: Login.js');
			}
		}
	);
});

app.get('/messages/sync', (req, res) => {
	Messages.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});
app.post('/messages/new', (req, res) => {
	const dbMessage = req.body;

	Messages.create(dbMessage, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get('/groups/sync', (req, res) => {
	Groups.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});
app.post('/groups/new', (req, res) => {
	const dbGroup = req.body;

	Groups.create(dbGroup, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.listen(port, () => console.log(`Listening to port ${port}`));

// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Headers", "*");
// 	next();
// });
