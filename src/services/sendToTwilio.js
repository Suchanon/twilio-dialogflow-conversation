import twilio from "twilio";

export default async function sendToTwilio(response, conversationSid) {
    //create the twilioClient
    const client = twilio(
        process.env.TWILIO_API_KEY_SID,//  https://console.twilio.com/us1/account/keys-credentials/api-keys
        process.env.TWILIO_API_KEY_SECRET, //we can see it only one time when we create API key
        {accountSid: process.env.TWILIO_ACCOUNT_SID}
       );

    try {
        await client.conversations.conversations(conversationSid)
                    .messages
                    .create({author: 'system', body: response})
        return true;
    } catch (err) {
        console.log('Twilio error: ' + err);
        return false;
    }
 }