const { cmd, commands } = require('../command');
const config = require('../config');

// repo info
cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Info about the bot repository",
    category: "main",
    react: "👨‍💻",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `*Hello there QUEEN-AURORA-MD User! 👋🏻* 

> Simple , Straight Forward But Loaded With Features 🎊, Meet  WhatsApp Bot.

*Thanks for using QUEEN-AURORA-MD * 

> Don't forget to frok the repo ⤵️

`;

        // Send image with caption
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/C0ZWF8B/Alive-image.png` }, 
            caption: dec, 
            contextInfo: { 
                mentionedJid: [m.sender], 
                forwardingScore: 999, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: '120363393123655822@newsletter', 
                    newsletterName: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃', 
                    serverMessageId: 143 
                } 
            } 
        }, { quoted: mek });
     
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
