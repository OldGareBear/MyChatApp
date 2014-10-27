(function() {
  if (typeof ChatApp === 'undefined') {
    window.ChatApp = {};
  }

  Chat = ChatApp.Chat = function (socket) {
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function (message) {
    this.socket.emit("message", {text: message});
  };

})();