const db = require("./clients/db");
const errors = require("./errors");
const logger = require("./logger");
const INTERNAL_ERROR = "Internal Error";
const LOGIN_ERROR = "Login Error";

module.exports = {
    insertMemeTemplate: async (data) => {
        const response = await db.from("templates").upsert(
            data,
            { onConflict: "template_id" }
        );
        if (response.error) {
            console.log("Error:insertMemeTemplate", response.error.message);
            throw new Error(errors.INTERNAL_ERROR);
        }
        return response.data;
    },
    listMemeTemplates: async () => {
        const response = await db.from("templates").select()
            .order('created_at', { ascending: false });
        if (response.error) {
            console.log("Error:insertMemeTemplate", response.error.message);
            throw new Error(errors.INTERNAL_ERROR);
        }
        return response.data;
    },
    listMyMemes: async (user_id) => {
        const response = await db.from("my_memes").select()
            .eq("user_id", user_id)
            .order('created_at', { ascending: false });
        if (response.error) {
            console.log("Error:insertMemeTemplate", response.error.message);
            throw new Error(errors.INTERNAL_ERROR);
        }
        return response.data;
    },
    insertMyMeme: async (data) => {
        const response = await db.from("my_memes").insert(
            data
        );
        if (response.error) {
            console.log("Error:insertMyMeme", response.error.message);
            throw new Error(errors.INTERNAL_ERROR);
        }
        return response.data;
    },
}