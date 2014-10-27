var createServer = function (server) {

  var guestnumber = 1;
  var nicknames = {};

  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    guestnumber += 1;
    var defaultName = "guest" + guestnumber;
    nicknames[socket.id] = defaultName;

    socket.emit('startup', {
      text: "Connection established for " + nicknames[socket.id] + "."
    });

    socket.on('message', function(data){
      socket.emit('message', {
        text: nicknames[socket.id] + ": " + data["text"]
      })
    });

    socket.on('changeNickname', function(data) {
      nicknames[socket.id] = data["nickName"];
    })
  });
};

exports.createServer = createServer;