const Joi = require('joi');
const express = require ('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');


//app.use(express.json());
// app.use(express.static(path.join(__dirname + '/../public')))
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));


const User = mongoose.model('User', new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},		
	password: {
		type: String,
		required: true,
	}	
}));

mongoose.connect('mongodb://localhost/WebApp', { useNewUrlParser: true })
 .then(() => console.log('Connected to MongoDB...'))
 .catch(err => console.error('Could not connect to MongoDB...', err))




  

app.get('/',(req,res)=>{
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index.html');
	// res.send("/public/index.html")
})

app.post('/sign_up', async (req, res) => {
    // const { error } = validateUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var password = req.body.password

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash( password, salt )

    let user1 = await User.findOne({ email: email })
    if (user1) return res.status(400).send('User already exists')
    	const user = new User ({
    		name: name,
    		phone: phone,
    		email: email,
    		password: hashed
    	})
    const lastlast = await user.save()
    console.log(lastlast)

    return res.redirect('/public/success.html')
//    let user = new User ({
//    	name: req.body.name,
//    	phone: req.body.phone,
//    	email: req.body.email,
//    	password: bcrypt.hash(req.body.email)


})


// function validateUser(user){
// 	const schema = {
// 		name: Joi.string().min(5).max(50).required(),
// 		phone: Joi.string().min(5).max(50).required(),
// 		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
// 		email: Joi.string().email({ minDomainSegments: 2 })
// 	}
// }
 











app.get('/login',(req,res) =>{
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index1.html', '/public/jsj.');
	// res.send("/public/index1.html")
})









app.listen(3000, () => console.log('Listening on port 3000....'));