const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  const data = JSON.parse(event.body);
  const { name, email, message } = data;

  // Validate the inputs
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please provide name, email, and message' })
    };
  }

  // Set up nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  // Set up email data
  let mailOptions = {
    from: email,
    to: 'your-email@gmail.com',
    subject: `New contact from ${name}`,
    text: message
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message' })
    };
  }
};
