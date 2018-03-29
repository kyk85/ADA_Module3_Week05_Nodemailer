var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "kay2kay1@gmail.com",
            pass: "grkzdlubfwtehsdn"
        }
    });

router.get('/', function(req, res){
    res.json({message:'it works!'});
});

router.post('/sendmail', function(req, res) {
    var email = req.body.email;
    var name = req.body.name;
    let mailOptions = {
        from: '"kay2kay1@gmail.com" <kay2kay1@gmail.com>',
        to: email,
        subject: 'Hello',
        text: 'Hello World',
        html: '<b>Hello World</b>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json(error);
        }
        res.json({message: "sending email to " + name + " at " + email})
    });
})

app.use('/api', router)
app.listen(port);
console.log('Magic happens on port' + port)