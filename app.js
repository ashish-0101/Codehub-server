const express = require('express');
const bodyParser = require('body-parser');
const mongoogse = require('mongoose');

const usersRoutes = require('./routes/users-routes');
const classroomsRoutes = require('./routes/classrooms-routes');
const questionsRoutes = require('./routes/questions-routes');
const submissionsRoutes = require('./routes/submissions-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTION'
  );
  next();
});

app.use('/api/users', usersRoutes);
app.use('/api/classrooms', classroomsRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/submissions', submissionsRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Something Went Wrong!' });
});

mongoogse
  .connect(
    'mongodb+srv://ashishg0101:U6mzuXUTwKfYKfs3@cluster0.ufw5myy.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(4000, () => {
      console.log('CONNECTED!');
    });
  })
  .catch((err) => {
    console.log(err);
  });
