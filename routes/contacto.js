var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto', { title: 'Express' });
});

var nodemailer = require('nodemailer');

router.post('/contacto', async(req, res, next)=>{
  var nombre= req.body.nombre;
  var email= req.body.email;
  var comentario= req.body.comentario;

  var obj={
    to:'andree.se.07@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre + 'escribio desde la web, el siguiente comentario:'+'<br>'+comentario+'<br> Responder a: '+ email,
  }

  var transporter= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  var info = await  transporter.sendMail(obj);

  res.render('/contacto',{
  message:'Mensaje enviado correctamente',
  });
})//CIERRE PETICION DE POST

module.exports = router;
