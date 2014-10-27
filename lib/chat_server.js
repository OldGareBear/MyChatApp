var createServer = function (server) {

  var guestnumber = 1;
  var nicknames = {};

  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    guestnumber += 1;
    var defaultName = "guest" + guestnumber;
    nicknames[socket.id] = defaultName;

    socket.emit('startup', {
      text: "Connection established for " + defaultName + "."
    });

    socket.on('message', function(data){
      socket.emit('message', { text: defaultName + ": " + data["text"] })
    });
  });
};

exports.createServer = createServer;