const twilio = require('twilio');

// Replace these with your Twilio credentials
const accountSid = 'AC0ab17d5e8baecf426bda20f2a144fd20';
const authToken = '9dbf4e1665ffd13bbf2b8def4c52ab69';
 const client = new twilio(accountSid, authToken);

// Your Twilio WhatsApp sandbox number
const twilioWhatsAppNumber = 'whatsapp:+971551157552';  

// Your verified WhatsApp number
const userWhatsAppNumber = 'whatsapp:+971551157552';  

client.messages
  .create({
    from: twilioWhatsAppNumber,
    to: userWhatsAppNumber,
    body: 'Hello from Twilio WhatsApp API!',
  })
  .then((message) => console.log('Message sent! SID:', message.sid))
  .catch((error) => console.error('Error:', error));
