//router file for generator.controller.js
// Path: backend\generator\generator.router.js
// Compare this snippet from backend\generator\generator.controller.js:
// openai api key =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

const openai = require('openai');
const express = require('express');
const router = express.Router();

// Define the Mad Lib template
const template = 'One [adjective] day, I [verb] to the [noun] to buy some [plural noun].';

// Use OpenAI API to generate suggestions for words

async function generateSuggestions(prompt) {
    const completions = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5,
    });
    const message = completions.choices[0].text.trim();
    return message;
    }

// Define the endpoint for the Mad Lib generator
router.post('/madlib', async (req, res) => {
    try {
        // Generate suggestions for words
        const adjective = await generateSuggestions('Suggest an adjective');
        const verb = await generateSuggestions('Suggest a verb');
        const noun = await generateSuggestions('Suggest a noun');
        const pluralNoun = await generateSuggestions('Suggest a plural noun');

        // Get user input for words
        const userInput = {
            adjective: req.body.adjective,
            verb: req.body.verb,
            noun: req.body.noun,
            pluralNoun: req.body.pluralNoun,
        };

        // Generate the completed Mad Lib
        let madLib = template;
        madLib = madLib.replace('[adjective]', userInput.adjective || adjective);
        madLib = madLib.replace('[verb]', userInput.verb || verb);
        madLib = madLib.replace('[noun]', userInput.noun || noun);
        madLib = madLib.replace('[plural noun]', userInput.pluralNoun || pluralNoun);

        res.json({ madLib: madLib });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
