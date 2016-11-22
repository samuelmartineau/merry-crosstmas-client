'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 5000,
    routes: {cors: true}
});

// Add the route
server.route({
    method: 'POST',
    path:'/send', 
    handler: function (request, reply) {
        return reply({message: 'hello world'});
        // return reply(new Error('Internal Error'));
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});