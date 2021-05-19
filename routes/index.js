var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET userlist-page*/
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usuarios');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist": docs
    });
  });
});

/* GET new User page */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Adicionar Novo Usuário'});
});

/* POST to add user service */
router.post('/adduser', function (req, res) {

  var db = req.db;
  var collection = db.get('usuarios');

  // obtem valores do formulario web
  var userName = req.body.username;
  var userEmail = req.body.usermail;
  
  // envia para o banco de dados
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if (err) {
      res.send("Problema com o banco de dados.");
    } 
    else {
      // carrega a lista de usuarios
      res.redirect("userlist");
    }
  });
});

module.exports = router;
