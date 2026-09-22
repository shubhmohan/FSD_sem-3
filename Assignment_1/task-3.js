console.log('1. Synchronous Start: Script execution begins.');


setTimeout(() => {
    console.log('4. setTimeout (0ms delay) executed in Timer phase.');
}, 0);

setImmediate(() => {
    console.log('5. setImmediate executed in Check phase.');
});


process.nextTick(() => {
    console.log('3. process.nextTick executed (Microtask Queue).');
});

console.log('2. Synchronous End: All callbacks scheduled.');