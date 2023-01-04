const express = require('express');
const chat = require('./ChatMod');

const app = express();

app.use(express.json());

app.get('/init', async (req, res) => {
  const response = await chat.initChat();
  res.send(response);
});

app.post('/create-room', async (req, res) => {
  const roomId = req.body.roomId;
  const UserId = req.body.UserId;
  const response =await chat.createRoom(roomId, UserId);
  res.send(response);
});

app.post('/one-to-one-chat', async (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const roomId = req.body.roomId
  const response = await chat.oneToOneChat(sender, receiver,roomId);
  res.send(response);
});

app.post('/send-message', async (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const message = req.body.message;
  const room = req.body.roomId;
  const response = await chat.sendMessage(sender, receiver, message, room);
  res.send(response);
});

app.get('/receive-message', async (req, res) => {
  const room = req.query.room;
  const response = await chat.receiveMessage(room);
  res.send(response);
});

app.get('/update-chat-history', async (req, res) => {
  const roomId = req.query.roomId;
  const response =await chat.updateChatHistory(roomId);
  res.send(response);
});


app.listen(5000, () => {
  console.log('Server listening on port 5000');
});