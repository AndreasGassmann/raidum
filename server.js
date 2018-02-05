var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('balances', users);
  socket.on('transactionRequest', (data) => {
    console.log('new transaction', data);
    let sender = users.find(u => u.id === data.senderID);
    let receiver = users.find(u => u.id === data.receiverID);
    sender.balance -= Number(data.amount);
    receiver.balance += Number(data.amount);
    io.emit('transactionSuccess', data);
    console.log('new balances', users);
    socket.emit('balances', users);
  });
  socket.on('getBalances', () => {
    console.log('getBalances');
    socket.emit('balances', users);
  })
});

let users = [{
  id: 1,
  name: "Alessandro",
  balance: 500
}, {
  id: 2,
  name: "Andreas",
  balance: 500
}, {
  id: 3,
  name: "Pascal",
  balance: 500
}];

http.listen(4444, function(){
  console.log('listening on *:3000');
});