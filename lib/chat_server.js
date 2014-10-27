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
      if (checkName(data["nickName"])) {
        nicknames[socket.id] = data["nickName"];
      } else {
        socket.emit("invalidName", { error: "Sorry, that name is reserved!" });
      }
    })
  });

  function checkName (nickname) {
    for (var key in nicknames) {
      if (nicknames[key] === nickname) {
        return false;
      }
    };

    if (nickname.slice(0, 5) === "guest") {
      return false;
    }

    return true
  };
};

exports.createServer = createServer;