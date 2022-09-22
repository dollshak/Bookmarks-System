const axios = require('axios');

exports.homeRouts = (req, res) => {
    axios.get('http://localhost:3000/bookmarks')
    .then(function (response){
        res.render('index', {bookmarks: response.data});
    })
    .catch(err => {
        res.send(err);
    });
}

exports.add_bookmark = (req, res) => {
    res.render('add_bookmark');
}
exports.update_bookmark = (req, res) => {
    res.render('update_bookmark');
}