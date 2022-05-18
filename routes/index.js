var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/first_app')
var Schema = mongoose.Schema

var todoSchema = new Schema({
  name: String,
  task: String,
  status: String
},{collection: 'test'})

var todoData = mongoose.model('todoData', todoSchema)



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Todo List
// Get All
router.get('/all', function(req, res, next){
  todoData.find()
      .then(function(doc){
        res.json(doc)
      });
});

// Add a task
router.post('/add', function(req, res, next){
  var todo = {
    name: req.body.name,
    task: req.body.task,
    status: req.body.status
  };
  var data = new todoData(todo);
  data.save();
  res.json(data)
});


// Update a task
router.post('/update', function(req, res, next){
  var todo = {
    name: req.body.name,
    task: req.body.task,
    status: req.body.status
  };
  var id = req.body.id;
  todoData.findByIdAndUpdate(id, todo, function(err){
    if (err){
      console.error("Error, task not found");
    }
  });
  data = {
    status: 200,
    message: "Task has been updated"
  }
  res.json(data)
});


// Delete a task
router.post('/update', function(req, res, next){
  var id = req.body.id;
  todoData.findByIdAndRemove(id).exec();
  data = {
    status: 200,
    message: "Task has been deleted"
  }
  res.json(data)
});

module.exports = router;
