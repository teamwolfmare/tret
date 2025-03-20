let fs = require('fs');
const os = require("os")
const axios = require('axios')
const config = require('../config')
const fetch = require("node-fetch");
const { exec } = require('child_process');
const moment = require("moment-timezone");
const {cmd , commands} = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, runtime,  fetchJson} = require('../lib/functions')


// Md Time Functions
const Sdate=moment().tz("Asia/Colombo").format("YYYY-MM-DD");
const Stime=moment().tz("Asia/Colombo").format("HH:mm:ss");
         
let MDBOT_NAME = config.BOT_NAME
let MDPREFIX = config.PREFIX
let MDBOT_VERSION = config.BOT_VERSION
let MDOWNER_NUMBER = config.OWNER_NUMBER
let MD_OWNER = config.MD_OWNER
let mdMODE = config.MODE
    
//===================== MENU =================

cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "menu the bot",
    react: "📃",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    
// Send an audio file
await conn.sendMessage(from, {
    audio: { url: 'https://github.com/QuuenAurora589/Voive-database/blob/main/Alive%20message.mp3' }, // Audio URL
    mimetype: 'audio/mp3',
    ptt: true
}, { quoted: mek });


        let menumsg = `
ʜᴇʏ ${pushname} 👋,

👑 Welcome to Queen Aurora All Menu list. 🤖✨


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

I’m here to assist you with all sorts of tasks. Choose an option below to get started: 📝🚀

┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
┃
┃┣◽ 1. 𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 👑🛠️  
┃┣◽ 2. 𝗖𝗢𝗡𝗩𝗘𝗥𝗧 𝗢𝗣𝗧𝗜𝗢𝗡𝗦 🔄⚙️  
┃┣◽ 3. 𝗔𝗜 𝗙𝗨𝗡 🤖🎉  
┃┣◽ 4. 𝗦𝗘𝗔𝗥𝗖𝗛 𝗣𝗢𝗪𝗘𝗥 🔍⚡  
┃┣◽ 5. 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗭𝗢𝗡𝗘 📥🎶  
┃┣◽ 6. 𝗙𝗨𝗡 & 𝗚𝗔𝗠𝗘𝗦 🎮😆  
┃┣◽ 7. 𝗠𝗔𝗜𝗡 𝗛𝗨𝗕 🌐🏠  
┃┣◽ 8. 𝗟𝗢𝗚𝗢 𝗠𝗘𝗡𝗨 🖼️🎨  
┃┣◽ 9. 𝗚𝗥𝗢𝗨𝗣 𝗚𝗔𝗠𝗘𝗦 👥🎲  
┃┣◽ 10. 𝗨𝗦𝗘𝗙𝗨𝗟 𝗧𝗢𝗢𝗟𝗘𝗦 🛠️📈    
┃┣◽ 11. 𝗡𝗦𝗙𝗪 𝗭𝗢𝗡𝗘 🔞🔥  
┃┣◽ 12. 𝗠𝗢𝗩𝗜𝗘 𝗭𝗢𝗡𝗘 🎥🍿  
┃┣◽ 13. 𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡 𝗭𝗢𝗡𝗘 😜🙌  
┃
┗━━━━━━━━━━━━━━
    📝  ʀᴇᴘʟʏ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴏꜰ ᴍᴇɴᴜ ʟɪꜱᴛ ᴡʜᴀᴛ ʏᴏᴜ ᴡᴀɴᴛ.ᴛʜᴇɴ ᴅɪꜱᴘʟᴀʏ ɪᴛ !!!


    
    > Qᴜᴇᴇɴ ᴀᴜʀᴏʀᴀ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʜᴀꜱɪɪ ꜰʀᴀɴᴀɴᴅᴏ.....
    > 𝐇𝐀𝐒𝐈𝐈 𝐅𝐑𝐀𝐍𝐀𝐍𝐃𝐎 𝐏𝐑𝐎𝐔𝐃𝐋𝐘 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐒
    > © 𝘈𝘭𝘭 𝘙𝘪𝘨𝘩𝘵𝘴 𝘙𝘦𝘴𝘦𝘳𝘷𝘦𝘥 𝘉𝘺 𝓗𝓪𝓷𝓼𝓪𝓴𝓪 𝓕𝓻𝓪𝓷𝓪𝓷𝓭𝓸.




👤  > 𝘊𝘰𝘯𝘵𝘢𝘤𝘵 𝘖𝘸𝘯𝘦𝘳 :
          ɢɪᴛ ʜᴜʙ  : https://github.com/QuuenAurora589
          ᴡʜᴀᴛꜱᴀᴘᴘ : https://wa.me//94779912589?text=ꜰʀᴏᴍ Qᴜᴇᴇɴ ᴀᴜʀᴏʀᴀ
          ꜰᴀᴄᴇʙᴏᴏᴋ : https://www.facebook.com/share/12EdztTthRR/
          ᴛɪᴋᴛᴏᴋ : https://www.tiktok.com/@_hasii_franeendo_780x?_t=ZS-8tOZEDSHvN4&_r=1

T̶h̶a̶n̶k̶s̶ f̶o̶r̶ u̶s̶i̶n̶g̶ 🤍        
`;

const vv = conn.sendMessage(from, { text: menumsg,
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
}}, { quoted: mek});

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                case '1':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .forward
    ┃  .shutdown
    ┃  .broadcast
    ┃  .block
    ┃  .unblock
    ┃  .clearchats
    ┃  .jid
    ┃  .gjid
    ┃  .restart
    ┃  .update
    ┃  .ban
    ┃  .unban
    ┃  .addsudo
    ┃  .delsudo`,
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
}
    });
                        break;
                    case '2':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗖𝗢𝗡𝗩𝗘𝗥𝗧 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .toptt
    ┃  .tts
    ┃  .sticker
    ┃  .emojimix
    ┃  .trt`,
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
}
    });
                        break;
                        case '3':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗔𝗜 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .gemini
    ┃  .ai
    ┃  .totext
    ┃  .aiimage
    ┃  .meta `,
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
}
    });
                        break;
                        case '4':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗦𝗘𝗔𝗥𝗖𝗛 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .esananews
    ┃  .img
    ┃  .bingimg
    ┃  .movie
    ┃  .news
    ┃  .pinterest
    ┃  .wallpaper
    ┃  .yts`,
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
}
    });
                        break;
                        case '5':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .tiktok
    ┃  .fb
    ┃  .twitter
    ┃  .mediafire
    ┃  .ig
    ┃  .baiscope
    ┃  .ginisisila
    ┃  .apk
    ┃  .gdrive
    ┃  .spotify
    ┃  .song
    ┃  .video`,
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
}
    });
                        break;
                        case '6':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗙𝗨𝗡 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .animegirl
    ┃  .quote
    ┃  .joke
    ┃  .hack
    ┃  .fact
    ┃  .dog`,
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
}
    });
                        break;
                        case '7':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗠𝗔𝗜𝗡 𝗛𝗨𝗕
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .alive
    ┃  .system
    ┃  .runtime
    ┃  .ping
    ┃  .owner
    ┃  .menu
    ┃  .vv`,
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
}
    });
                        break;
                        case '8':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗟𝗢𝗚𝗢 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .write
    ┃  .starsnight
    ┃  .leaves
    ┃  .metalstar
    ┃  .starzodiac
    ┃  .avatargold
    ┃  .frozen
    ┃  .neondevil
    ┃  .snow3d
    ┃  .birthday
    ┃  .colorfulangel
    ┃  .makingneon
    ┃  .beautifulgold
    ┃  .thunder
    ┃  .galaxy1
    ┃  .write
    ┃  .advancedglow
    ┃  .typography
    ┃  .pixelglitch
    ┃  .neonglitch
    ┃  .glitch
    ┃  .flag
    ┃  .flag3
    ┃  .deleting
    ┃  .blackpink
    ┃  .glowing
    ┃  .underwater
    ┃  .logomaker
    ┃  .cartoon
    ┃  .papercut
    ┃  .glitch
    ┃  .watercolor
    ┃  .effectcloud
    ┃  .gradien
    ┃  .summerbeach
    ┃  .luxurygold
    ┃  .multicolourneon
    ┃  .sandsummer
    ┃  .galaxywallpaper
    ┃  .1971
    ┃  .makingneon
    ┃  .royal
    ┃  .freecreate
    ┃  .galaxystyle
    ┃  .lighteffect`,
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
}
    });
                        break;
                        case '9':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .kick
    ┃  .add
    ┃  .delete
    ┃  .kickall
    ┃  .opentime
    ┃  .closetime
    ┃  .tagall
    ┃  .tagadmin
    ┃  .mute
    ┃  .unmute
    ┃  .promote
    ┃  .demote
    ┃  .setname
    ┃  .setdesc
    ┃  .invite
    ┃  .join
    ┃  .leave`,
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
}
    });
                        break;
                        case '10':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗧𝗢𝗢𝗟𝗦 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .gpass
    ┃  .githubstalk
    ┃  .srepo
    ┃  .weather
    ┃  .cal
    ┃  .currency
    ┃  .translate
    ┃  .tempmail
    ┃  .checkmail
    ┃  .delmail
    ┃  .password
    ┃  .hijact
    ┃  .fancy
    ┃  .removebg
    ┃  .boom
    ┃  .enhance
    ┃  .getdetails
    ┃  .toimg
    ┃  .tourl`,
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
}
    });
                        break;
                        case '11':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗡𝗦𝗙𝗪 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .xnxx
    ┃  .xvideos
    ┃  .phub`,
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
}
    });
                        break;
                        case '12':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗠𝗢𝗩𝗜𝗘 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .sinhalasub
    ┃  .cinesubz
    ┃  .ytsmx
    ┃  .1337x`,
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
}
    });
                        break;
                        case '13':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/BP6VV0c/20250115-091321.jpg`},caption: `
𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡 𝗠𝗘𝗡𝗨
    ┏━━━❮ 📜 ᴄᴏᴍᴍᴀɴᴅꜱ 📜 ❯━━
    ┃
    ┃  .bully
    ┃  .cuddle
    ┃  .cry
    ┃  .hug
    ┃  .awoo
    ┃  .kiss
    ┃  .lick
    ┃  .pat
    ┃  .smug
    ┃  .bonk
    ┃  .yeet
    ┃  .blush
    ┃  .smile
    ┃  .wave
    ┃  .highfive
    ┃  .handhold
    ┃  .nom
    ┃  .bite
    ┃  .glomp
    ┃  .slap
    ┃  .kill
    ┃  .kick
    ┃  .happy
    ┃  .wink
    ┃  .poke
    ┃  .dance
    ┃  .cringes`,
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
}
    });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    }catch(e){
console.log(e)
reply(`${e}`)
}
})

