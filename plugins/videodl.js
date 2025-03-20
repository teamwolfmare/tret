const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const domain = `https://manu-ofc-api-site-6bfcbe0e18f6.herokuapp.com`;
const api_key = `MY-VIDEO-OFC`;
const yts = require('yt-search');
//===========================================

    cmd({
    pattern: "video",
    desc: 'Download Song / Video',
    use: '.play Title',
    react: "📹",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
 
    try {
        if (!q) return reply('𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗧𝗵𝗲 𝗩𝗶𝗱𝗲𝗼 𝗧𝗶𝘁𝗹𝗲 ❗.');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
> *📺 QUEEN-AURORA-𝗠𝗗 𝗩𝗜𝗗𝗘𝗢 📺*
╭──────────────────────

> *☘️ ➢| ᴛɪᴛʟᴇ  :* *${data.title}*

> *👀 ➢| ᴠɪᴇᴡꜱ  :* *${data.views}*

> *⛔ ➢| ᴅᴇꜱᴄʀɪᴘᴛɪᴏᴍ  :* *${data.description}*

> *⏰ ➢| ᴛɪᴍᴇ  :* *${data.timestamp}* 

> *📅 ➢| ᴀɢᴏ  :* *${data.ago}*
*╰─────────────────────*
*🔢𝘙𝘌𝘗𝘓𝘠 𝘛𝘏𝘌 𝘛𝘏𝘈𝘛𝘚 𝘠𝘖𝘜 𝘞𝘈𝘕𝘛𝘚 𝘕𝘜𝘔𝘉𝘌𝘙*

|| 01.|| Video 🎬

|| 02.|| Document 📂

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑
`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':

    const response = await fetchJson(`${domain}/ytmp4-dl?apikey=${api_key}&videoUrl=${url}&resolution=360`);
    
    const downloadUrl = response.data.dl_link;


await conn.sendMessage(from,{video:{url: downloadUrl },mimetype:"video/mp4",caption :"> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑"},{quoted:mek})
                        break;
       
                    case '2':               
                        // Send Document File
    const responsex = await fetchJson(`${domain}/ytmp4-dl?apikey=${api_key}&videoUrl=${url}&resolution=360`);
    
    const downloadUrlx = responsex.data.dl_link;

await conn.sendMessage(from,{document:{url: downloadUrlx },mimetype:"video/mp4",fileName: data.title + ".mp4",caption :"> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑"},{quoted:mek})
                        break;
 
                    default:
                        reply("𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗢𝗽𝘁𝗶𝗼𝗻.❗ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗦𝗲𝗹𝗲𝗰𝘁 𝗮 𝗩𝗮𝗹𝗶𝗱 𝗢𝗽𝘁𝗶𝗼𝗻.");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
