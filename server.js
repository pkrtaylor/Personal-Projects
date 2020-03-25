const io = require('socket.io')(3000)
// we want to store user information
const users = {}



io.on('connection', socket => {
socket.on('new-user', name =>{
    //we want the key of users to be the id of the socket
    users[socket.id] =  name 
    //send message to all users who connected
    socket.broadcast.emit('user-connected', name)//now we must handle 'user-connected' on client side

})  
//setting up handling for the event of when we sed a message to server(i.e )
//writing a message and clicking send
socket.on('send-chat-message', message =>{
    socket.broadcast.emit('chat-message', {message: message, 
     name: users[socket.id]})
    //using an object in the second argument allows us to not only send the
    //message but also name of the sender 
    //socket.id gets the name of the user
})
socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
})
})