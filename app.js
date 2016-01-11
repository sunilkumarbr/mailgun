var api_key = 'key-5a991ef3f090ef55a0a9b10b22a302c5';
var domain = 'sandbox19934a8f22484a7e99897c77e42d546d.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var bodyparser = require('body-parser');

var express=require('express');
var app=express();

app.use(express.static('views'));
app.use(bodyparser.urlencoded({
    extended: false
}));





app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.post('/',function(req,res){
  

var data = {
  from: 'Mailgun Sandbox <postmaster@sandbox19934a8f22484a7e99897c77e42d546d.mailgun.org>',
  to: req.body.email,
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};
 
mailgun.messages().send(data, function (error, body) {
	if(error) throw res.send(error);
  	console.log(body);
  	res.send(body);
});
 


});

var port=Number(process.env.PORT||3156);
app.listen(port);
console.log('at '+port);
