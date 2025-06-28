const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUlpdGNNaGFveFR4VkdIa2krcEVWZiszQVRva1N2elAzK3ljKzBiclBHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGtuZndNZzdTK0ZOMGs0d0xHYi8xbGFyWUx4a0FNSVFoVFhOYVB0a00xaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHT2s2cEdXc0F4bXVEUkdxL3RYL0NnaEZLWEthRkJDQVBldnRwVEhrdlZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5MTZ0cS9YQ2VobkNIbzVqeUtlaGxTSmxtc0lwckVNYStHREkwRk5wa1M4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFLZ2NGc3Yva2FYUkMrVEhkNUl6ZHFvQlJ5MUF3dGpnS0pabjl5alVNRTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhhOVRGODJHQ2J3VmwvV08rR3JHYmVaMGhmaU4xT1VUZG1xTE9NSkxDU1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0tla2JqQ3Avb2FLSFFoVkd4U1pLSi91cXhIOEVEZjdZOXdhRWNrZTBtZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidjV4aEs4WEpJL05qeGdsM3Q5dUkwR25teXBjbVRuZHFiY2k2TDFlNVNYQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFIUmNjL0hjdGJkQTRFWUZCbWlRQnhsWVB0U1dSVEx5eDdJVjZBT3ZxNTlWMUF2UWhKbFlkaEx1MzNXa0RjelJFQzhJQlJvOXdKQU1saSt5T2o4R2hnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODcsImFkdlNlY3JldEtleSI6IkdpeGlacHNlTzdOT3dWeXQ0UDhKRk9aOGtFcmpIMk94T1ZDV1k5NzRxQ289IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzNTQwMTkwOTYzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdBNUNFRjY1NkE4OUJBNjMzMTFDMjRDNTM5QTlCQTZGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEwOTYzMjh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU0MDE5MDk2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxNTA3NEIxMjBFRDFFQ0VGQzYwNUIwMENBODk4QUMwNiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMDk2MzQ1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJUQktGUTNTTiIsIm1lIjp7ImlkIjoiMjMzNTQwMTkwOTYzOjkwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ikl0J3MgUGxlbnR5IiwibGlkIjoiMzMwODYzNTA5NzQ5OjkwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTERNeXZjQkVPNjMvc0lHR0FnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTWNTZy9PcTJOejlnQjhqYWdJeWZlZlU5WHBIV3kyZitreEQ2bWdWSGlXTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOFpzTWg0ZktsbUlxZGgyVzlKSTF3QkdyN3FmakNIaE9EM0gxT2tXbFRqbVkvUDZZcUkvbmZBMUF1WEphSjhML21ONHI5NlhENmxhWlozVE40RWMxQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6ImhXYmF3NmFHL2JNcVA0VlZDNEpMdWc2Y2FmVjZWbzkwc3QwNWFVVGx6VFJ2QWVaT0E1azhNUkJPK1crTW02WDZ6ZEE5RVZoNFBPRlBSQW5YaHpuOGhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTQwMTkwOTYzOjkwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRIRW9QenF0amMvWUFmSTJvQ01uM24xUFY2UjFzdG4vcE1RK3BvRlI0bGoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTA5NjMxNSwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURLUiJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/toxiclover-tech/TOXIC-LOVER-MD',
    OWNER_NAME : process.env.OWNER_NAME || "toxic lover",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233540190963",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by JEEPERS CREEPER-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CAPTION : process.env.CAPTION || "✧JEEPERS CREEPER-XMD✧",
    BOT : process.env.BOT_NAME || '✧JEEPERS CREEPER-XMD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
