const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || 'k0oCVbDC#6gEJHBBxuU2r9B5GEYCjk6xjuk_5uNDd5mgRssxMmb0', //add your session id
MONGODB: process.env.MONGODB || "mongodb+srv://Queen-Aurora:Pasanhansaka2007@cluster0.x2ktu.mongodb.net/" //add your mongodb url
};



