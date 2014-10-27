(function() {
  if (typeof ChatApp === 'undefined') {
    window.ChatApp = {};
  }

  var ChatUI = ChatApp.ChatUI = function(chat) {
    this.chat = chat
  };

  ChatUI.prototype.getInput = function () {
    return $("form.send > input").val();
  };

  ChatUI.prototype.sendMessage = function () {
    this.chat.sendMessage(this.getInput());
  };

  ChatUI.prototype.displayMessage = function() {
    var chatUI = this;

    this.chat.socket.on("message", function(data) {
      $("div.display").append("<div>" + data.text + "<div>");
    });
  };

  ChatUI.prototype.setNickname = function() {
    var chatUI = this;
    $("form.nickname").on("submit", function(event) {
      event.preventDefault();
      var nickName = $("form.nickname > input").val();
      chatUI.chat.socket.emit("changeNickname", { nickName: nickName });
    });
  };

  var socket = io();
  var chat = new window.ChatApp.Chat(socket);
  var chatUI = new ChatUI(chat);
  chatUI.displayMessage();
  chatUI.setNickname();

  $("form.send").on("submit", function(event) {
    event.preventDefault();

    console.log("Text:" + chatUI.getInput());

    chatUI.sendMessage();
  });

})();
