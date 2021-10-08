require('dotenv').config()
const express = require("express");
const nodemailer = require("nodemailer");
const cors= require('cors')
const app = express();

app.use(express.json());
app.use(cors())

console.log(`${process.env.USER}`);

app.post("/send", (req, res) => {
  const { email, subject, message, name } = req.body;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: 'ariful4966@gmail.com', // generated ethereal user
      pass: `${process.env.PASS}`, // generated ethereal password
    },
  });

  transporter.sendMail(
    {
      from: req.body.email, // sender address
      to: "ariful.practice@gmail.com", // list of receivers
      subject: "✔" + subject, // Subject line
      text: message, // plain text body,
      html: `
    <h3>Informations</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
      </ul>
      <h3>Message</h3>
      <p>${message}</p>
    `,
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({
          message:
            "Submite your massage successfully" + " " + result.envelope.from,
        });
      }
    }
  );
  transporter.close();
});

app.listen(4000, () => console.log("app is running on port 4000"));
