const socket = io()
const sendLocationBtn = document.querySelector('#send-location');
const messageForm = document.querySelector('#message-form');
const messages = document.querySelector('#messages');

// Teplates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-message-template").innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Options
const queryString = Qs.parse(location.search, { ignoreQueryPrefix: true });

// Auto Scrolling
const autoscroll = () => {
    // new message element
    const newMessage = messages.lastElementChild;

    // Height of the new message
    const newMessageStyles = getComputedStyle(newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

    // visible height
    const visibleHeight = messages.offsetHeight;

    // height of messages container
    const containerHeight = messages.scrollHeight;

    // how far have i scrolled?
    const scrollOffset = messages.scrollTop + visibleHeight;

    if(containerHeight - newMessageHeight <= scrollOffset){
        messages.scrollTop = messages.scrollHeight
    }
}

// listen message event
socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, { message: message.text, username: message.username, createdAt: moment(message.createdAt).format('h:mm:ss a') });
    messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

// listen location event
socket.on('location', (message)=>{
    const html = Mustache.render(locationTemplate, { url:message.url, username: message.username, createdAt: moment(message.createdAt).format('h:mm:ss a') });
    messages.insertAdjacentHTML('beforeend', html);
    sendLocationBtn.removeAttribute('disabled');
    autoscroll();
});

//listen room data event
socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, { room, users });
    document.querySelector('#sidebar').innerHTML = html;
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error)=>{
        if(error){
            return console.log(error);
        }
        console.log("Message Delivered!!!");
    })
});

sendLocationBtn.addEventListener('click', () => {

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    sendLocationBtn.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (error)=>{
            if(error) return console.log(error);
            console.log("Location Delivered!!!");
            sendLocationBtn.removeAttribute('disabled');
        });
    }, (error) => {
        sendLocationBtn.removeAttribute('disabled');
        switch(error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.")
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.")
              break;
            case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.")
              break;
          }
    });
});

socket.emit('join', { username: queryString.username, room: queryString.room }, (error)=>{
    if(error){
        location.href = '/';
        alert(error);
    }
})