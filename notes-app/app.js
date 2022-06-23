//const validator = require('validator');
const notes = require('./notes');
//const chalk = require('chalk');
const yargs = require('yargs');
const { default: chalk } = require('chalk');

// adding a command 
yargs.command({
    command: 'add',
    describe: 'Add a new command',
    builder: {
        title: {
            describe: 'Add Title',
            demandOption: true,  // if title must required
            type: 'string'
        },
        author: {
            describe: 'Add Author',
            demandOption: true, // Author required
            type: 'string'
        }
    },
    handler(argv){
      notes.addNote({title: argv.title, author: argv.author})
    }
});

// remove a command 
yargs.command({
    command: 'remove',
    describe: 'command for removing a note',
    builder: {
        title: {
            describe: 'Add Title',
            demandOption: true,  // if title must required
            type: 'string'
        },
        author: {
            describe: 'Add Author',
            demandOption: true, // Author required
            type: 'string'
        }
    },
    handler(argv){
      notes.removeNotes({title: argv.title, author: argv.author})
    }
});


// display note a command
yargs.command({
    command: 'display',
    describe: 'display a note',
    handler(){
        notes.getNotes().forEach((note,i)=>{ console.log(chalk.bgBlue(`${i+1}.${note.title}`)) });
    }
});

// read note by title a command
yargs.command({
    command: 'readNote',
    describe: 'display a note',
    builder: {
        title: {
            describe: 'This is not title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});

yargs.parse();