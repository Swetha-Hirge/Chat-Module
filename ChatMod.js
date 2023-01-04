// const express = require('express');
const mongoose = require('mongoose');

// const app = express();

// Connect to MongoDB
mongoose.set('strictQuery', false); 
mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true});

const chatSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  createdAt: Date,
  room: String
});

const Chat = mongoose.model('Chat', chatSchema);

// Initialize the chat library and establish a connection with the chat server
const io = require('socket.io')();

// Initialize the chat library and establish a connection with the chat server
const initChat = async () => {
  io.on('connection', (socket) => {
    console.log('A user connected');
  });
  io.listen(3000);
  return "Chat initialized";
};

// Create a new chat room and invite other users to join
const createRoom = async (roomId, UserId) => {
    io.to(UserId).emit('invite', {roomId: roomId});
  return 'Chat room created'
};

// Initiate a private chat between two users
const oneToOneChat = async (sender, receiver, roomId) => {
  io.to(sender).emit('invite', {roomId: roomId});
  io.to(receiver).emit('invite', {roomId: roomId});
  return 'Private chat initiated'
};


// Send a message to another user or a group of users
const sendMessage = async (sender, receiver, message, room) => {
  const chat = new Chat({
    sender: sender,
    receiver: receiver,
    message: message,
    createdAt: new Date(),
    room: room
  });
 let save =  await chat.save();
  return save
};

// Receive and display messages from other users
const receiveMessage = async (roomId) => {
  const chats = await Chat.find({roomId: roomId});
  console.log(chats);
  return 'Messages received'
};

// Update the chat history and display previous messages
const updateChatHistory = async (roomId) => {
  const chats = await Chat.find({roomId: roomId}).sort('createdAt').exec();
  console.log(chats);
  return 'Chat history updated'
};



module.exports = {
  initChat,
  createRoom,
  oneToOneChat,
  sendMessage,
  receiveMessage,
  updateChatHistory
};
