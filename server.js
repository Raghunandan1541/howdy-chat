require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const Routes = require('./server/routes');

app.use([
	cors(),
	express.static('uploads'),
	express.json(),
	express.urlencoded({ extended: false }),
	Routes,
]);

const io = (module.exports.io = require('socket.io')(server));
const socketManager = require('./server/socketManager/socketManager');
io.on('connection', socketManager);

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
