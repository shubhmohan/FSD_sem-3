const EventEmitter = require('events');
const eventEmitter = new EventEmitter();


eventEmitter.on('studentJoined', (studentName) => {
    console.log(`Student ${studentName} joined the session.`);
});


eventEmitter.on('courseSelected', (courseName) => {
    console.log(`Course selected: ${courseName}`);
});


eventEmitter.on('sessionEnded', (sessionCode) => {
    console.log(`Session ended, Code: ${sessionCode}`);
});


eventEmitter.emit('studentJoined', 'Rahul');
eventEmitter.emit('courseSelected', 'Full Stack Development');
eventEmitter.emit('sessionEnded', 0);