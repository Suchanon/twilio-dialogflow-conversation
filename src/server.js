
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import sendToDialogflow from "./services/sendToDialogflow.js"
import sendToTwilio from "./services/sendToTwilio.js"

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 3000;

 app.get("/test-server", async (req, res) => {
        res.status(200).send("Hello i'm running");
 })

 app.post("/dialogflow", async (req, res) => {
  const projectId = "jokes-ewit"; 
    let sessionId = req.body.ConversationSid;  
    // https://console.twilio.com/us1/service/conversations/IS3b55643eef0b44f681d767a66e5214ca/conversation-service-conversations?frameUrl=%2Fconsole%2Fconversations%2Fservices%2FIS3b55643eef0b44f681d767a66e5214ca%2Fconversations%2FCH95f4a52d6f7042bb8ec7bf4828f08411%3F__override_layout__%3Dembed%26bifrost%3Dtrue%26x-target-region%3Dus1&currentFrameUrl=%2Fconsole%2Fconversations%2Fservices%2FIS3b55643eef0b44f681d767a66e5214ca%2Fconversations%2FCH95f4a52d6f7042bb8ec7bf4828f08411%2Fmessages%3F__override_layout__%3Dembed%26bifrost%3Dtrue%26x-target-region%3Dus1
    let query = req.body.Body;
    // let sessionId = "CH95f4a52d6f7042bb8ec7bf4828f08411"
    // let query = "hi there"

    let response = await (await sendToDialogflow(projectId, sessionId, query)).queryResult.fulfillmentText;
    console.log("response>", response)
    if (!(response)) { res.status(500).send(); }

    let result = await sendToTwilio(response, sessionId);
    if (result) { res.status(201).send("Everything working fine :  " + sessionId + query); }
    res.status(500).send(); 
 })
 
 app.listen(port, () => {
    console.log(`Dialogflow integration listening on port ${port}`)
  })


