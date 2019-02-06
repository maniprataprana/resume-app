const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
	.connect(db)
	.then(() => console.log('mongodb connected...'))
	.catch(error => console.error(error));
mongoose.Promise = global.Promise;

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// static assets for prod
if (process.env.NODE_ENV !== 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
