const { createClient } = require("@supabase/supabase-js");
const dotenv = require('dotenv');
dotenv.config();
const DATABASE_URL = process.env.SUPABASE_DB_URL;
const SUPABASE_SERVICE_API_KEY = process.env.SUPABASE_DB_KEY;
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

module.exports = supabase;