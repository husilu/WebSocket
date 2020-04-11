const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {

  wss.clients.forEach(client => {
    client.send('您好，贴心客服在线服务，请问有什么可以帮您？');	 // 给对应的客户端连接发送消息
  })
  // 监听客户端发来的消息
  ws.on('message', (message) => {
    let msgData = JSON.parse(message); // 接受的数据是json字符串
    wss.clients.forEach(client => {
      client.send(msgData);	 // 给对应的客户端连接发送消息
    })
    // if (msgData.type === 'open') {
    //   console.log(msgData)
    //   // 初始连接时标识会话
    //   ws.sessionId = `${msgData.fromUserId}-${msgData.toUserId}`;
    // } else {
    //   let sessionId = `${msgData.toUserId}-${msgData.fromUserId}`;
    //   wss.clients.forEach(client => {
    //     if (client.sessionId === sessionId) {
    //       client.send(message);	 // 给对应的客户端连接发送消息
    //     }
    //   })  
    // }
  })

  // 连接关闭
  ws.on('close', () => {
    console.log('连接关闭');
  });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8081);
