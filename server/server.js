const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const port = process.env.PORT;
const { Configuration, OpenAIApi } = require("openai");

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY, 
});

const openai = new OpenAIApi(configuration);
app.post("/find-complxity", async (req, res) => { 

    try {
        const { prompt } = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003", 
            prompt: `
                // ${prompt}
                const example=(arr)=>{
                    arr.map((item)=>{
                        console.log(item2);
                    });
                }
            `,
            max_tokens: 100, 
            temperature: 0,
            top_p: 1.0, 
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"], 
        });
        return res.status(200).json({
            success: true,
            data: response.choices[0].text
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        });
    }
});

const server = app.listen(port, () => {
    console.log('Listening to port ' + port);
});
