import express from 'express';
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

app.post('/', async (req, res) => {
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
                        content: `You are a helpful assistant...`
                    },
                    { 
                        role: "user", 
                        content: `give better prompt: ${prompt}`
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;