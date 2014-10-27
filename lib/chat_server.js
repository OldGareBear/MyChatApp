var createServer = function (server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    socket.emit('startup', { text: "Connection established." });
    socket.on('message', function(data){
      socket.emit('message', { text: data })
    });
  });
};

exports.createServer = createServer;