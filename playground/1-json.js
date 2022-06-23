const fs = require('fs');
const yargs = require('yargs');

if(!fs.existsSync('author.json')){

    console.log("File not exits!!!");

    const book = {
        title: 'C Programming',
        author: 'J Richardson'
    }

    const json = JSON.stringify(book);

    fs.writeFileSync('author.json', json);

    console.log("New File Created!!!");
}

const fileBuffer = fs.readFileSync('author.json');
const bookObj = JSON.parse(fileBuffer.toString());

yargs.command({
    command: 'change',
    describe: 'change book details',
    builder: {
        title: {
            describe: 'Book Title',
            demandOption: true,
            type: 'string'
        },
        author: {
            describe: 'Book Author',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        bookObj.title = argv.title;
        bookObj.author = argv.author;
        fs.writeFileSync('author.json', JSON.stringify(bookObj));
        console.log("Book Updated Successfully");
    }
});



yargs.parse();
