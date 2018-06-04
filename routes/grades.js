var express = require('express');
var router = express.Router();


let grades = [{
  id: 1,
  name: 'Asaad',
  course: 'MWA',
  grade: 97
}, {
  id: 2,
  name: 'Ayman',
  course: 'MWA',
  grade: 94
}];

//http://localhost:3000/grades/
router.get('/', function (req, res, next) {
  res.send(grades);
});

//http://localhost:3000/grades/1
router.get('/:id', function (req, res, next) {
  req.params.assert('id', 'id is required').notEmpty();
  res.send(grades.filter(elem => elem.id == req.params.id)[0]);
});

//http://localhost:3000/grades/
//body => {"id":"5","name":"Youssef","course":"MWA","grade":"94"}
router.post('/', function (req, res, next) {
  req.body.assert('id', 'id is required').notEmpty();
  req.body.assert('name', 'name is required').notEmpty();
  req.body.assert('course', 'course is required').notEmpty();
  req.body.assert('grade', 'grade is required').notEmpty();

  grades.push(req.body);
  res.send(grades);
});

//http://localhost:3000/grades/2
//body => {"id":"2","name":"Shadi","course":"MWA","grade":"94"}
router.put('/:id', function (req, res, next) {
  req.body.assert('id', 'id is required').notEmpty();
  req.body.assert('name', 'name is required').notEmpty();
  req.body.assert('course', 'course is required').notEmpty();
  req.body.assert('grade', 'grade is required').notEmpty();

  for (let i = 0; i < grades.length; i++) {
    if (grades[i].id == req.params.id) {
      grades[i] = req.body;
      break;
    }
  }
  res.send(grades);
});

//http://localhost:3000/grades/2
router.delete('/:id', function (req, res, next) {
  req.params.assert('id', 'id is required').notEmpty();
  for (let i = 0; i < grades.length; i++) {
    if (grades[i].id == req.params.id) {
      grades.splice(i, 1);
      break;
    }
  }
  res.send(grades);
});

module.exports = router;
