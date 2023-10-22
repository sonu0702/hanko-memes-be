const axios = require('axios');
const errors = require("../errors");
const qstring = require('querystring');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    generateTemplateImages: async () => {
        try {
            const response = await axios.get('https://api.imgflip.com/get_memes');
            return response?.data?.data?.memes;
        } catch (error) {
            console.error('generateTemplateImages:error:', { err: error });
        }
    },
    generateMeme: async (args) => {
        try {
            console.log("generateMeme:args",args);
            const data = qstring.stringify({
                template_id: args.templateId,
                username: process.env.IMGFLIP_USERNAME,
                password: process.env.IMGFLIP_PASSWORD,
                text0: args.text0,
                text1: args.text1,
            });

            // Implement the generation of meme using the Imgflip API
            const res = await axios.post('https://api.imgflip.com/caption_image', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const url = res.data.data;

            console.log('generated meme url: ', url);

            return url;
        } catch (error) {
            console.error(`generateMeme`, { err: error });
            throw new Error(errors.INTERNAL_ERROR);
        }
    }
}