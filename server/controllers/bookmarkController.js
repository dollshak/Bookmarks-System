const Bookmark = require('../models/Bookmark');

const getAllBookmarks = async (req, res) => {
    try{
        const bookmarks = await Bookmark.find();
        res.json(bookmarks);
    }
    catch(error){
        res.status(400).send({message: 'could not get all bookmarks'});
    }
};

const createBookmark = async (req, res) => {
    const reqBody = req.body;

    //check that the bookbark is valid
    if (!reqBody){
        res.status(400).send({message: "body can not be empty"});
    }
    else if(!reqBody.address){
        res.status(400).send({message: "address is required"});
    }
    else if (!reqBody.name){
        res.status(400).send({message: "name is required"});
    }
    else if (!validURL(reqBody.address)){
        res.status(400).send({message: "url is not valid"});
    }
    else if (reqBody.description && reqBody.description.length > 100){
        res.status(400).send({message: "description is too long"});
    }
    else if(reqBody.description && !isAlphaNumeric(reqBody.description)){
        res.status(400).send({message: 'description should contain only alpha numeric values'});
    }
    else if (reqBody.task && reqBody.task.length > 200){
        res.status(400).send({message: "task length is too long"});
    }
    else{ //insert to database
        const newBookmark = new Bookmark({
            address: reqBody.address,
            name: reqBody.name,
            description: reqBody.description,
            task: reqBody.task
        });
    
        await newBookmark.save()
        .then(data => {
            res.redirect('/add-bookmark')
        })
        .catch(error => {
            res.status(500).json({message: "error occured while trying to save the bookmark in the database"});
        });
    }
};

const deleteBookmark = async (req, res) => {
    try{
        if (!req.params.Id){
            res.status(400).send({message: "should give an id to delete"});
        }
        else{
            const removedBookmark = await Bookmark.deleteOne({_id: req.params.Id});
            res.json(removedBookmark);
        }
    }
    catch(error){
        res.status(500).send({message: "error occured while trying to delete the bookmark in the database"});
    }
};


function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

function isAlphaNumeric(str){
    var regEx = /^[0-9a-zA-Z]+$/;
    return str.match(regEx);
} 

module.exports = {
    getAllBookmarks,
    createBookmark,
    deleteBookmark,
};