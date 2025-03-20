const { updateEnv, readEnv } = require('../lib/database');
const EnvVar = require('../lib/mongodbenv');
const { cmd } = require('../command');

cmd({
    pattern: "update",
    alias: ["undefined"],
    desc: "Check and update environment variables",
    react: "⚙",
    category: "owner",
    filename: __filename,
},
async (conn, mek, m, { from, q, reply, isOwner }) => {
    
    if (!isOwner) return;

    if (!q) {
        return reply("🙇‍♂️ *Please provide the environment variable and its new value.* \n\nExample: `.update ALIVE_MSG: hello i am Supun Fernando`");
    }

    // Find the position of the first colon or comma
    const colonIndex = q.indexOf(':');
    const commaIndex = q.indexOf(',');

    // Ensure we have a valid delimiter index
    const delimiterIndex = colonIndex !== -1 ? colonIndex : commaIndex;
    if (delimiterIndex === -1) {
        return reply("🫠 *Invalid format. Please use the format:* `.update KEY:VALUE`");
    }

    // Extract key and value
    const key = q.substring(0, delimiterIndex).trim();
    const value = q.substring(delimiterIndex + 1).trim();
    
    // Extract mode if provided
    const parts = value.split(/\s+/).filter(part => part.trim());
    const newValue = value; // Use the full value as provided by the user
    const mode = parts.length > 1 ? parts.slice(1).join(' ').trim() : '';
    
    const validModes = ['public', 'private', 'groups', 'inbox'];
    const finalMode = validModes.includes(mode) ? mode : '';

    if (!key || !newValue) {
        return reply("🫠 *Invalid format. Please use the format:* `.update KEY:VALUE`");
    }

    // Specific checks for MODE, ALIVE_IMG, and AUTO_READ_STATUS
    if (key === 'MODE' && !validModes.includes(newValue)) {
        return reply(`😒 *Invalid mode. Valid modes are: ${validModes.join(', ')}*`);
    }
 
    if (key === 'ALIVE_IMG' && !newValue.startsWith('https://')) {
        return reply("😓 *Invalid URL format. PLEASE GIVE ME IMAGE URL*");
    }
    if (key === 'AUTO_READ_STATUS' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for AUTO_READ_STATUS. Please use `true` or `false`.*");
    }
    if (key === 'AUTO_VOICE' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for AUTO_VOICE. Please use `true` or `false`.*");
    }
        
       if (key === 'AUTO_STICKER' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for AUTO_STICKER. Please use `true` or `false`.*");
    }
    
       if (key === 'AUTO_REPLY' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for AUTO_REPLY. Please use `true` or `false`.*");
    }
    
       if (key === 'AUTO_REACT' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for AUTO_REACT. Please use `true` or `false`.*");
    }
    
       if (key === 'HEART_REACT' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for HEART_REACT. Please use `true` or `false`.*");
    }
    
       if (key === 'OWNER_REACT' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for OWNER_REACT. Please use `true` or `false`.*");
    }
    
       if (key === 'ANTI_BAD_WORDS_ENABLED' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for ANTI_BAD_WORDS_ENABLED. Please use `true` or `false`.*");
    }
       
        if (key === 'ANTI_BOT' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for ANTI_BOT. Please use `true` or `false`.*");
    }
    
        if (key === 'ANTI_LINK' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for ANTI_LINK. Please use `true` or `false`.*");
    }
    
        if (key === 'AUTO_READ_CMD' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for AUTO_READ_CMD. Please use `true` or `false`.*");
    }
    
           if (key === 'ALWAYS_TYPING' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for ALWAYS_TYPING. Please use `true` or `false`.*");
    }

       if (key === 'ALWAYS_RECORDING' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for ALWAYS_RECORDING. Please use `true` or `false`.*");
    }   
    
       if (key === 'ALWAYS_ONLINE' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for ALWAYS_ONLINE. Please use `true` or `false`.*");
    }
    
       if (key === 'AUTO_BIO' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for AUTO_BIO. Please use `true` or `false`.*");
    }       

  if (key === 'ALLWAYS_OFFLINE' && !['true', 'false'].includes(newValue)) {
        return reply("😓 *Invalid value for ALLWAYS_OFFLINE. Please use `true` or `false`.*");
    }       
    
    try {
        // Check if the environment variable exists
        const envVar = await EnvVar.findOne({ key: key });

        if (!envVar) {
            // If the variable does not exist, fetch and list all existing env vars
            const allEnvVars = await EnvVar.find({});
            const envList = allEnvVars.map(env => `${env.key}: ${env.value}`).join('\n');
            return reply(`❌ *The environment variable ${key} does not exist.*\n\n*Here are the existing environment variables:*\n\n${envList}`);
        }

        // Update the environment variable
        await updateEnv(key, newValue, finalMode);
        reply(`✅ *Environment variable updated.*\n\n🗃️ *${key}* ➠ ${newValue} ${finalMode ? `\n*Mode:* ${finalMode}` : ''}`);
        
    } catch (err) {
        console.error('Error updating environment variable:' + err.message);
        reply("🙇‍♂️ *Failed to update the environment variable. Please try again.*" + err);
    }
});
