import express from 'express';
import cors from 'cors'; // Import the CORS package
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

const app = express();

// Use CORS and specify your Chrome extension's origin
app.use(cors({
    origin: 'chrome-extension://epadkibamflmgdggkpbbgndjfpijnoce', // Use your actual extension ID here
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.post('/improve-prompt', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        const client = new ModelClient(endpoint, new AzureKeyCredential(token));

        const response = await client.path("/chat/completions").post({
            body: {
                messages: [
                    {
                        role: "system", 
                        content: `
                        You are a helpful assistant. 
                        <task> Take the given prompt and improve it </task> 
                        <constraint> Return only the improved version of the prompt without additional words. 
                        Do not start with "Here is your improved prompt" or any similar phrasing. 
                        The response should only contain the improved version, without any additional text or explanation.</constraint>`
                    },
                    { 
                        role: "user", 
                        content: "give better prompt:" + prompt 
                    }
                ],
                model: modelName,
                temperature: 0.7,
                max_tokens: 1000,
                top_p: 1.0
            }
        });
        

        if (response.status !== "200") {
            throw response.body.error;
        }

        const improvedPrompt = response.body.choices[0].message.content;
        res.json({ improvedPrompt });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to improve the prompt." });
    }
});

app.listen(3000, () => {
    console.log("Proxy server listening on port 3000");
});
