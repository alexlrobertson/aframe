import express from 'express';
import Post from './post';

const app = express();

app.get('/', function(req, res) {
  res.send('index');
});

app.get('/process', function (req, res) {
  Post.findAll()
    .then(function (data) {
      res.send(data);
    })
    .catch(function (err) {
      res
        .status(500)
        .send('Something went wrong' + err);
    });
});

app.get('/process/:id', function (req, res) {
  Post
    .findById(req.params.id)
    .then(function (data) {
      if (!data) {
        return res
          .status(404)
          .send('No model for ' + req.params.id);
      }
      res.send(data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

app.set('view engine', 'jade');

app.listen(3000);