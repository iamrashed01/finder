const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMail = (toEmail, code, subject) => {
  const msg = {
    to: toEmail, // Change to your recipient
    from: {
      name: 'FINDER APP - RASHED',
      email: process.env.fromEmail,
    }, // Change to your verified sender
    subject: subject || 'Email verification code from Finder App',
    text: `Email verification code: ${code}`,
    html: `<h1>Email verification code: ${code}</h1>`,
  };
  sgMail.send(msg)
    .then(() => {}, (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    })
    .catch((ex) => {
      console.log(ex);
    });
};

module.exports = sendMail;
