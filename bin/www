// We use this as application entry
// Here, we also setup our server

import http from 'http';

import app from '../app';

const port = parseInt(process.env.PORT, 10) || 5000;

app.set('port', port); //Set the port

const server = http.createServer(app);
server.listen(port, () => {
    console.log('Server started at port '+port);
});