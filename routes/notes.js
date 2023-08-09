const fs = require('fs/promises');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const existingNotes = await fs.readFile('data/data.json', 'utf8', function(err, data){
        // console.log('This is the data from data.json file', data);
    });
    let filteredNotes = [...existingNotes]
    if (req.query.search) {
        // ?search=lorem
         
    }
    res.status(200).send(existingNotes);  
});

router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    const existingNotes = await fs.readFile('data/data.json', 'utf8', function(err, data){
        // console.log('This is the data from data.json file', data);
    });
    var myNotes= JSON.parse(existingNotes);


    try{
        // res.status(200).send(myNotes[id-1]);
        res.status(200).send(myNotes.find(x => x.id == id));
    }catch(err){
        return res.sendStatus(404);
    }
});

router.post('/create', async(req, res) => {

    const title = req.body.title;
    const content = req.body.content;
    const noteColour = req.body.noteColour;
    const pinPoint =req.body.pinPoint;
    if(!title){
        return res.sendStatus(400);
    }
    if(!content){
        return res.sendStatus(400);
    }
    if(!noteColour){
        return res.sendStatus(400);
    }
    if(!pinPoint){
        return res.sendStatus(400);
    }
    const existingNotes = await fs.readFile('data/data.json', 'utf8', function(err, data){
        // console.log('This is the data from data.json file', data);
    });

    var myNotes= JSON.parse(existingNotes);

    const id = myNotes.length + 1;
    const createdOn = new Date().toISOString();
    // console.log(createdOn);

    const notesData = {id, title, content, noteColour, pinPoint, createdOn};
    myNotes.push(notesData);
    // console.log(myNotes);

    var newNotes = JSON.stringify(myNotes);

    await fs.writeFile('data/data.json', newNotes, err => {
        if(err) throw err;
        // console.log("New data added");
    });

    try{
        res.sendStatus(200);
    }catch(err){
        return res.sendStatus(400);
    }
})

router.post('/create/:id', async(req, res) => {

    const id = req.body.id;
    // console.log(id)
    const title = req.body.title;
    const content = req.body.content;
    if(!id && !title && !content){
        return res.sendStatus(400);
    }
    // if(!title){
    //     return res.sendStatus(400);
    // }
    // if(!content){
    //     return res.sendStatus(400);
    // }
    const existingNotes = await fs.readFile('data/data.json', 'utf8', function(err, data){
        // console.log('This is the data from data.json file', data);
    });

    var myNotes= JSON.parse(existingNotes);
    const createdOn = new Date().toISOString();
    const notesData = {id, title, content, createdOn};

    myNotes[id - 1] = notesData;

    var newNotes = JSON.stringify(myNotes);

    await fs.writeFile('data/data.json', newNotes, err => {
        if(err) throw err;
        // console.log("New data added");
    });

    try{
        res.sendStatus(200);
    }catch(err){
        return res.sendStatus(400);
    }
})

router.delete('/delete/:id', async(req, res) => {

    const id = req.body.id;
    if(!id){
        return res.sendStatus(400);
    }

    const existingNotes = await fs.readFile('data/data.json', 'utf8', function(err, data){
        // console.log('This is the data from data.json file', data);
    });

    var myNotes= JSON.parse(existingNotes);

    myNotes.splice(myNotes.findIndex(x => x.id == id), 1);

    // console.log(myNotes);

    // const index = myNotes.find(x => x.id == id);
    // console.log(index);

    // myNotes.splice(myNotes[id - 1], 1);
    // console.log(myNotes);
    // myNotes[id - 1] = notesData;

    var newNotes = JSON.stringify(myNotes);

    // console.log(newNotes);

    await fs.writeFile('data/data.json', newNotes, err => {
        if(err) throw err;
        // console.log("New data added");
    });

    try{
        res.sendStatus(200);
    }catch(err){
        return res.sendStatus(400);
    }
})

module.exports = router;