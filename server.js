const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.options('*', cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Faltan EMAIL_USER o EMAIL_PASS en .env');
  process.exit(1);
}


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});


transporter.verify((error) => {
  if (error) {
    console.error('❌ Error SMTP:', error);
  } else {
    console.log('✅ SMTP listo para enviar correos');
  }
});


app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.post('/contacto', async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({
        ok: false,
        error: 'Faltan campos'
      });
    }

    await transporter.sendMail({
      from: `"Web Contacto" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre}`,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
    });

    console.log('✅ Correo enviado');

    return res.json({
      ok: true,
      message: 'Mensaje enviado'
    });

  } catch (error) {
    console.error('❌ Error enviando correo:', error);

    return res.status(500).json({
      ok: false,
      error: 'Error interno del servidor'
    });
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
});
