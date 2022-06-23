
const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    let notes = [];
    if(fs.existsSync('notes.json')){
        notes = JSON.parse(fs.readFileSync('notes.json').toString());
    }
    return notes;
}

const saveNotes = (notes) => {
    const contents = typeof notes === 'string' ? notes : JSON.stringify(notes);
    fs.writeFileSync('notes.json', contents);
}

const readNote = (title) => {
    const findedNote = getNotes().find((note)=>note.title===title);
    if(!findedNote){
        console.log(chalk.bgRed('No note Found'));
    }else{
        console.log(chalk.bgGreen(`Title of the note is ${findedNote.title}, and author of this note is ${findedNote.author}`));
    }
}

const removeNotes = (removeNote) => {
    const notes = getNotes();
    const filteredNotes = notes.filter((note)=> !(removeNote.author===note.author && removeNote.title===note.title))
    if(notes.length === filteredNotes.length){
        console.log(chalk.bgRed('Note Not Found!!'));
    }else{
        saveNotes(filteredNotes);
        console.log(chalk.bgBlue('Note Removed Successfully!!'));
    }
}

const addNote = (note)=>{
    const notes = getNotes();
    const duplicateNote = notes.find((not)=>(not.title === note.title));

    if(!duplicateNote){
        notes.push(note);
        saveNotes(JSON.stringify(notes));
        console.log(chalk.bgGreen('Note Added Successfully!!'));
    }else{
        console.log(chalk.bgRed(`Note you try to add with title '${note.title}' is already exits in notes.json file!!`));
    }
}

module.exports = {
    addNote, saveNotes, getNotes, removeNotes, readNote
};
