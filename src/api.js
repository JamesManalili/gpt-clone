import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the API key from environment variables
const apiKey = process.env.REACT_APP_API_KEY;
console.log("API Key:", apiKey); // Debugging line to verify if the key is loaded

const genAI = new GoogleGenerativeAI(apiKey);

// Function to send a message to Google Gemini AI
export async function sendMsgToGoogleGemini(prompt) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain"
    };

    try {
        const chatSession = model.startChat({
            generationConfig,
            history: []
            // Adjust safetySettings if needed
            // See https://ai.google.dev/gemini-api/docs/safety-settings
        });

        const result = await chatSession.sendMessage(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error sending message to Google Gemini AI:", error);
        throw error;
    }
}
