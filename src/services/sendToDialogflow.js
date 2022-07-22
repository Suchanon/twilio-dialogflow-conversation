import dialogflow from "@google-cloud/dialogflow";

export default async function sendToDialogflow(
    projectId,
    sessionId,
    query
   ) {
     
    const sessionClient = new dialogflow.SessionsClient();
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );
   
    // The text query request
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: "en-US",
        },
      },
    };
   
    try {
      const responses = await sessionClient.detectIntent(request);
      return responses[0];
    } catch (err) {
        console.log("Dialogflow error: " + err);
    }
    return false;
   }