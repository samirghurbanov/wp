const express = require('express');
const twilio = require('twilio');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Twilio Credentials


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const client = twilio(accountSid, authToken);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Webhook for incoming messages
app.post('/whatsapp', (req, res) => {
    const message = req.body.Body.toLowerCase();
    const from = req.body.From;
    
    let responseMessage = '';
    
    if (message.includes('merhaba')) {
        responseMessage = 'Merhaba! Size nasıl yardımcı olabilirim?';
    } else if (message.includes('fiyatlar')) {
        responseMessage = 'Fiyat listemiz: \n- Ürün A: 100 TL\n- Ürün B: 150 TL';
    } else {
        responseMessage = 'Size nasıl yardımcı olabilirim? "Merhaba" veya "Fiyatlar" yazabilirsiniz.';
    }

    client.messages
        .create({
            from: whatsappNumber,
            to: from,
            body: responseMessage,
        })
        .then(() => res.status(200).send('Message sent'))
        .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
