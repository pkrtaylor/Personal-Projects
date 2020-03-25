const socket= io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
// creating message element - getting our message input
const messageInput= document.getElementById('message-input')

//now to get the names of the users
//use prompt element-data inouted into prompt will be stored the the variable
const name = prompt('what is your name?')
appendMessage('You joined')
//we want to send this message to our srver
//lets us know who joined
socket.emit('new-user', name)

messageForm.addEventListener('submit', e => {
    //this stop our page from posting to our sever, and from refeshing 
    //if we ddint do this we would loose all of our chat messages 
    e.preventDefault()

    //next we want to get our message
    //from creating messageInput we want the value from it
    const message = messageInput.value

    //this shows you your own text messages
    appendMessage(`You: ${message}`)
    
    //emit send information( 'message' ) from client to server
    //the name of event is 'send-chat-message'
    socket.emit('send-chat-message', message)
    //set value of message input to blank string just so it empties 
    //out the message everytime we send it. meaning when we type a message in the 
    //box it wil be cleared out and sent to server. 
    messageInput.value= ' '
    
})
//this is how the messges are placed on the client side
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on('user-connected', name => {
    //sends users the names of who connected 
    appendMessage(`${name} connected`)
})
socket.on('user-disconnected', name => {
    //sends users the names of who connected 
    appendMessage(`${name} disconnected`)
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}