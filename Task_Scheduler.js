const readline = require('readline');
const schedule = require('node-schedule');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function executeTask(task) {
    console.log(`Executing task: ${task}`);
}

function scheduleTask(task, scheduleTime) {
    console.log(`Scheduling task "${task}" at ${scheduleTime}`);
    schedule.scheduleJob(scheduleTime, () => {
        executeTask(task);
    });
}

function takeTaskInput() {
    rl.question('Enter task name: ', (task) => {
        rl.question('Enter date (YYYY-MM-DD): ', (date) => {
            rl.question('Enter time (HH:mm:ss): ', (time) => {
                const scheduleTime = new Date(`${date}T${time}`);
                if (isNaN(scheduleTime.getTime())) {
                    console.log('Invalid date or time format. Please try again.');
                    takeTaskInput(); 
                } else {
                    scheduleTask(task, scheduleTime);
                    rl.question('Do you want to add another task? (yes/no): ', (answer) => {
                        if (answer.toLowerCase() === 'yes') {
                            takeTaskInput(); 
                        } else {
                            rl.close(); 
                        }
                    });
                }
            });
        });
    });
}
takeTaskInput();
