const EventEmitter = require('events');

class StudentActivityTracker extends EventEmitter {}

const tracker = new StudentActivityTracker();


tracker.on('login', (student) => {
    console.log(`[LOGIN] ${student.name} (ID: ${student.id}) logged in successfully.`);
});

tracker.on('courseRegistration', (studentName, course) => {
    console.log(`[REGISTRATION] ${studentName} enrolled in course: ${course}.`);
});

tracker.on('notification', (msg) => {
    console.log(`[NOTIFICATION] Alert: ${msg}`);
});

tracker.on('logout', (studentName) => {
    console.log(`[LOGOUT] ${studentName} logged out. Session closed.`);
});


console.log('=== Student Activity Tracker Execution ===\n');

tracker.emit('login', { name: 'Rahul', id: 'S101' });
tracker.emit('courseRegistration', 'Rahul', 'Full Stack Development');
tracker.emit('notification', 'Welcome email sent to student.');
tracker.emit('logout', 'Rahul');