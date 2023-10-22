const image_flip = require("./clients/image_flip");
const db = require("./db_helper");
const captions = require("./generated_meme_caption.json");
const openai = require("./clients/open_ai");
const crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    generateMemeTemplateImagesFromImageFlip: async () => {
        const templateMemes = await image_flip.generateTemplateImages();
        if (!templateMemes) {
            return []
        }
        let memeWith2boxCount = templateMemes.filter(meme => meme.box_count === 2);
        //insertable data
        let data = memeWith2boxCount.map(meme => {
            return {
                template_id: meme.id,
                name: meme.name,
                url: meme.url,
                width: meme.width,
                height: meme.height,
                box_count: meme.box_count,
                // captions:meme.captions
            }
        })
        let result = await db.insertMemeTemplate(data);
        return result;
    },
    generateMeme: async (body, user_id) => {
        if (!body.templateId || !body.text0 || !body.text1) {
            throw new Error(`Invalid arguments`);
        }
        let imageurl = await image_flip.generateMeme(body);
        if (!imageurl) {
            throw new Error("Could not generate meme");
        }
        await db.insertMyMeme({ user_id: user_id, url: imageurl.url, template_id: body.templateId })
        return imageurl;
    },
    generateAICaptions: async (body) => {
        if (!process.env.USE_AI || !process.env.USE_AI === 'false') {
            let randomId = crypto.randomInt(captions.length);
            let generatedCaptions = captions[randomId];
            return generatedCaptions
        }
        if (!body.topic || !body.audience || !body.templateName) {
            throw new Error(`Invalid Arguments`);
        }
        let openAIResponse = await openai.generateCaption(body.topic, body.audience, body.templateName);
        return {
            top_caption: openAIResponse.memeIdeaText0,
            bottom_caption: openAIResponse.memeIdeaText1
        }
    }
}