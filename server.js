ecvar express = require('express');
var path = require('path');
var app = express();
var count = 0;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index');
});

var server = app.listen(8000, function(){
	console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log('SOCKET HERE');
	socket.on('count_button', function(){
		count++;
		io.emit('increase_count', {count : count});
	});
	socket.on('reset_button', function(){
		count = 0;
		io.emit('reset_count', {count : count});
	});
});
