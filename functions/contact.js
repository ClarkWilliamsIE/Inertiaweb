// netlify/functions/contact.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    // Validate the input data here if necessary

    // Simulate sending email or saving to database
    console.log(`Received message from ${name} (${email}): ${message}`);

    // Respond with success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message' })
    };
  }
};

