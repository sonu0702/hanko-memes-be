const openaiclient = require('openai');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    generateCaption: async (topicsStr, audience, templateName) => {
        const openai = new openaiclient.OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const sysPrompt = `You are a meme idea generator. You will use the imgflip api to generate a meme based on an idea you suggest. Given a random template name and topics, generate a meme idea for the intended audience. Only use the template provided`;
        const userPrompt = `Topics: ${topicsStr} \n Intended Audience: ${audience} \n Template: ${templateName} \n`;

        let openAIResponse;
        try {
            openAIResponse = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: sysPrompt },
                    { role: 'user', content: userPrompt },
                ],
                functions: [
                    {
                        name: 'generateMemeImage',
                        description: 'Generate meme via the imgflip API based on the given idea',
                        parameters: {
                            type: 'object',
                            properties: {
                                text0: { type: 'string', description: 'The text for the top caption of the meme' },
                                text1: { type: 'string', description: 'The text for the bottom caption of the meme' },
                            },
                            required: ['templateName', 'text0', 'text1'],
                        },
                    },
                ],
                function_call: {
                    name: 'generateMemeImage',
                },
                model: 'gpt-4-0613',
            });
        } catch (error) {
            console.error('Error calling openAI: ', error);
            throw new Error('Error calling openAI');
        }

        console.log(openAIResponse.choices[0]);

        /**
         * the Function call returned by openAI looks like this:
         */
        // {
        //   index: 0,
        //   message: {
        //     role: 'assistant',
        //     content: null,
        //     function_call: {
        //       name: 'generateMeme',
        //       arguments: '{\n' +
        //         `  "text0": "CSS you've been writing all day",\n` +
        //         '  "text1": "This looks horrible"\n' +
        //         '}'
        //     }
        //   },
        //   finish_reason: 'stop'
        // }
        if (!openAIResponse.choices[0].message.function_call) throw new Error('No function call in openAI response');

        const gptArgs = JSON.parse(openAIResponse.choices[0].message.function_call.arguments);
        console.log('gptArgs: ', gptArgs);

        const memeIdeaText0 = gptArgs.text0;
        const memeIdeaText1 = gptArgs.text1;

        console.log('captions', memeIdeaText0, memeIdeaText1);
        return { memeIdeaText0, memeIdeaText1 }
    }
}