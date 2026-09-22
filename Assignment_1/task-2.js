const EventEmitter = require('events');


const application = new EventEmitter();


application.on('input', (text) => {
    console.log(`[Input Event]: Text entered -> "${text}"`);
});

application.on('buttonClick', (buttonName) => {
    console.log(`[Click Event]: ${buttonName} button was clicked.`);
});

application.on('formSubmit', (formData) => {
    console.log(`[Form Event]: Form submitted successfully for user: ${formData.user}`);
});


application.on('notification', (message) => {
    console.log(`[Notification Event]: ${message}`);
});


application.emit('input', 'Hello Node.js');
application.emit('buttonClick', 'Submit');
application.emit('formSubmit', { user: 'Rahul' });
application.emit('notification', 'You have 1 new unread message.');