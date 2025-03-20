const os = require("os")
const axios = require('axios')
const config = require('../config')
const moment = require("moment-timezone");
const {runtime , sleep} = require('../lib/functions')
const {cmd , commands} = require('../command')


let MDBOT_NAME = config.BOT_NAME
let MDPREFIX = config.PREFIX
let MDBOT_VERSION = config.BOT_VERSION
let MDOWNER_NUMBER = config.OWNER_NUMBER
let MD_OWNER = config.MD_OWNER
let mdMODE = config.MODE

//================ ALIVE =======================

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    react: "👋",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const Sdate=moment().tz("Asia/Colombo").format("YYYY-MM-DD");
const Stime=moment().tz("Asia/Colombo").format("HH:mm:ss");

  // Send an audio file
 await conn.sendMessage(from, {
    audio: { url: 'https://github.com/QuuenAurora589/Voive-database/blob/main/Alive%20message.mp3' }, // Audio URL
    mimetype: 'audio/mp3',
    ptt: true
}, { quoted: mek });

  
let alive = `
 Hey ${pushname} 👋 ,
     𝗤𝘂𝗲𝗲𝗻 𝗔𝗨𝗥𝗢𝗥𝗔 𝗶𝘀 
    ᴀʟɪᴠᴇ ɴᴏᴡ 😉✌️

* 👑𝚀𝚞𝚎𝚎𝚗 ＡＵＲＯＲＡ  Is alive now and ready to serve 🤖✨

    ʟᴇᴛ'ꜱ ɢᴇᴛ ᴛʜɪɴɢꜱ ʀᴏʟʟɪɴɢ ! 🚀.
    .
    
    ┏━━━━╣🗓️ 𝙏𝙤𝙙𝙖𝙮 🗓️╠━━━━
    ┃
    ┃ 📅 Date is : ${Sdate}
    ┃ ⏰ Time Now : ${Stime}
    ┃
    ┗━━━━━━━━━━━━━━━
    ┏━━━━❮📝 𝘿𝙚𝙩𝙖𝙞𝙡𝙨 📝❯━━━
    ┃🗣️ 𝚄𝚜𝚎𝚛 : ${pushname}
    ┃🤖 𝙱𝚘𝚝 : ${MDBOT_NAME}
    ┃📜 𝙿𝚛𝚎𝚏𝚒𝚡 : ${MDPREFIX}
    ┃📚 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 : ${MDBOT_VERSION}
    ┃📝 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.hostname()}
    ┃📟 𝙷𝚘𝚜𝚝 : ${MDOWNER_NUMBER}
    ┃🤴𝙾𝚠𝚗𝚎𝚛 : ${MD_OWNER}
    ┃🔊 𝙼𝚘𝚍𝚎 : ${mdMODE}
    ┃🍁 𝚄𝚙𝚝𝚒𝚖𝚎 : ${runtime(process.uptime())}
    ┃✨𝙼𝚎𝚖 : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
    ┗━━━━━━━━━━━━━━━━
    📝  Thank you for your choice !!

* 💠 Type .menu to see all available commands ✒️⚒️❓
* 💠 Type .owner to cantact owner of Queen Aurora 👤🎯✨


    > Qᴜᴇᴇɴ ᴀᴜʀᴏᴀ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʜᴀɴꜱᴀᴋᴀ ꜰʀᴀɴᴇᴇɴᴅᴏ ....
    > 𝐇𝐀𝐒𝐈𝐈 𝐅𝐑𝐀𝐍𝐄𝐄𝐍𝐃𝐎 𝐏𝐑𝐎𝐔𝐃𝐋𝐘 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐒.
    > © 𝘈𝘭𝘭 𝘙𝘪𝘨𝘩𝘵𝘴 𝘙𝘦𝘴𝘦𝘳𝘷𝘦𝘥 𝘉𝘺 𝘏𝘢𝘴𝘯𝘴𝘢𝘬𝘢 𝘍𝘳𝘢𝘯𝘦𝘦𝘯𝘥𝘰. 


    T̶h̶a̶n̶k̶s̶ f̶o̶r̶ u̶s̶i̶n̶g̶ 🤍`

await conn.sendMessage(from, { text: alive ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363393123655822@newsletter',
      newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃",
      serverMessageId: 999
    },
externalAdReply: { 
title: 'QUEEN-AURORA-MD',
body: `${pushname}`,
mediaType: 1,
sourceUrl: "https://github.com/QuuenAurora589/Queen-Aurora-MD" ,
thumbnailUrl: "https://i.ibb.co/C0ZWF8B/Alive-image.png" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})

 // Send an audio file
/* await conn.sendMessage(from, {
    audio: { url: 'https://github.com/QuuenAurora589/Voive-database/blob/main/Alive%20message.mp3' }, // Audio URL
    mimetype: 'audio/mp3',
    ptt: true
}, { quoted: mek });
**/

}catch(e){
console.log(e)
reply(`${e}`)
}
});
