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
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your email address from environment variable
      pass: process.env.SMTP_PASS // your email password from environment variable
    }
  });

  // Set up email data
  let mailOptions = {
    from: `Clark <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // sending email to your own address
    subject: `New contact from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`
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
