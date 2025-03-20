const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const yts = require('yt-search');
const domain = `https://manu-ofc-api-site-6bfcbe0e18f6.herokuapp.com`;
const api_key = `Manul-Ofc-Song-Dl-Key-9`;

 
cmd({
    pattern: "song2",
    alias: ["audio"],
    desc: 'Download Song / Video',
    use: '.play Title',
    react: "🎧",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('Please provide a title.');
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
> *🎧QUEEN-AURORA-𝗠𝗗 𝗔𝗨𝗗𝗜𝗢🎧*
╭──────────────────────

*☘️ ➢| ᴛɪᴛʟᴇ  :* *${data.title}*

*👀 ➢| ᴠɪᴇᴡꜱ  :* *${data.views}*

*⛔ ➢| ᴅᴇꜱᴄʀɪᴘᴛɪᴏᴍ  :* *${data.description}*

*⏰ ➢| ᴛɪᴍᴇ  :* *${data.timestamp}* 

*📅 ➢| ᴀɢᴏ  :* *${data.ago}*

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑*`;

//==========Send Thumbnail With Details==========
await conn.sendMessage(m.chat, {
            image: { url: data.thumbnail },
            caption: `${desc}`
        }, { quoted: mek });
        
    const response = await fetchJson(`${domain}/api/ytmp3?videoUrl=${data.url}&apikey=${api_key}`);
    
    const downloadUrl = response.data.dl_link;
//============Send Message======================
await conn.sendMessage(from, { text: '*𝘗𝘭𝘦𝘢𝘴𝘦 𝘞𝘢𝘪𝘵 𝘚𝘦𝘯𝘥𝘪𝘯𝘨 𝘵𝘩𝘦 𝘈𝘶𝘥𝘪𝘰🎧 & 𝘋𝘰𝘤𝘶𝘮𝘦𝘯𝘵📂*' })     
//============Send Audio======================
await conn.sendMessage(from,{audio:{url: downloadUrl },mimetype:"audio/mpeg",caption :"> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑 🎧"},{quoted:mek})
//=============Send Document=================
await conn.sendMessage(from,{document:{url: downloadUrl },mimetype:"audio/mpeg",fileName: data.title + ".mp3" ,caption :"> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑 🎧"},{quoted:mek})

} catch (e) {
console.log(e)
reply(`${e}`)
}
})
