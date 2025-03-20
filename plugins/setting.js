const os = require("os")
const config = require('../config')
const EnvVar = require('../lib/mongodbenv');
const { cmd, commands } = require('../command');
const { updateEnv, readEnv } = require('../lib/database');


cmd({
    pattern: "setting",
    alias: ["setting"],
    desc: "settings the bot",
    category: "owner",
    react: "⚙",
    filename: __filename


},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
            const config = await readEnv();
        
        let desc = `
👑 Queen Aurora's settings Command Options 💬

BOT WORK TYPE  
1.1 Public Mode 🌍  
1.2 Private Mode 🔒  
1.3 Group Only Mode 👥  
1.4 Inbox Only Mode 📩

---

AUTO SEEN STATUS 👀  
2.1 Auto Read Status ON ✅  
2.2 Auto Read Status OFF ❌

---

AUTO VOICE 🎙️  
3.1 Auto Voice ON 🎧  
3.2 Auto Voice OFF 🔕  

---

AUTO STICKER 🧑‍🎨  
4.1 Auto Status Send ON ✅  
4.2 Auto Status Send OFF ❌

---

AUTO REPLY MESSAGE 📲  
5.1 Auto Reply ON ✅  
5.2 Auto Reply OFF ❌

---

AUTO BIO 📝  
6.1 Auto Bio ON ✅  
6.2 Auto Bio OFF ❌

---

AUTO READ COMMANDS 🗣️  
7.1 Auto Read CMD ON ✅  
7.2 Auto Read CMD OFF ❌

---

AUTO REACT 💥  
8.1 Auto React ON ✅  
8.2 Auto React OFF ❌

---

HEART REACT ❤️  
9.1 Heart React ON 💖  
9.2 Heart React OFF 💔

---

OWNER REACT 👑  
10.1 Owner React ON ✅  
10.2 Owner React OFF ❌

---

ALWAYS ONLINE 🌐  
11.1 Always Online ON 🌟  
11.2 Always Online OFF 🔴

---

ALWAYS OFFLINE 🚫  
12.1 Always Offline ON ⛔  
12.2 Always Offline OFF ✅

---

ALWAYS RECORDING 🎥  
13.1 Always Recording ON 🎬  
13.2 Always Recording OFF ❌

---

ALWAYS TYPING ⌨️  
14.1 Always Typing ON 🖋️
14.2 Always Typing OFF ⛔

---

ANTI LINK 🔗  
15.1 Anti Link ON 🚫  
15.2 Anti Link OFF ✅

---

ANTI BOT 🤖  
16.1 Anti Bot ON 🚫  
16.2 Anti Bot OFF ✅

---

ANTI BAD WORDS 🚫  
17.1 Anti Bad Word ON 🛑  
17.2 Anti Bad Word OFF ✅



> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ
> 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑
`;

        const vv = await conn.sendMessage(from, { image: { url: "https://i.ibb.co/bHXBV08/9242c844b83f7bf9.jpg"}, caption: desc }, { quoted: mek });
        
        setTimeout(async () => {
            await conn.sendMessage(from, { delete: vv.key });
        }, 300000); // 10 seconds timeout for deletion

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".update MODE:public" );
                        reply(".restart");
                        break;
                    case '1.2':               
                        reply(".update MODE:private");
                        reply(".restart");
                        break;
                    case '1.3':               
                          reply(".update MODE:group");
                        reply(".restart");
                      break;
                    case '1.4':     
                        reply(".update MODE:inbox");
                        reply(".restart");
                      break;
                    case '2.1':     
                        reply(".update AUTO_READ_STATUS:true");
                        reply(".restart");
                        break;
                    case '2.2':     
                        reply(".update AUTO_READ_STATUS:false");
                        reply(".restart");
                    break;
                    case '3.1':    
                        reply(".update AUTO_VOICE:true");
                        reply(".restart");
                    break;
                    case '3.2':    
                        reply(".update AUTO_VOICE:false");
                        reply(".restart");
                    break;                  
                      case '4.1':    
                        reply(".update AUTO_STICKER:true");
                        reply(".restart");
                    break;
                    case '4.2':    
                        reply(".update AUTO_STICKER:false");
                        reply(".restart");
                    break;              
                    case '5.1':    
                        reply(".update AUTO_REPLY:true");
                        reply(".restart");
                    break;
                    case '5.2':    
                        reply(".update AUTO_REPLY:false");
                        reply(".restart");
                    break;                                 
                    case '6.1':    
                        reply(".update AUTO_BIO:true");
                        reply(".restart");
                    break;
                    case '6.2':    
                        reply(".update AUTO_BIO:false");
                        reply(".restart");
                    break;                        
                    case '7.1':    
                        reply(".update AUTO_READ_CMD:true");
                        reply(".restart");
                    break;
                    case '7.2':    
                        reply(".update AUTO_READ_CMD:false");
                        reply(".restart");
                    break;              
                     case '8.1':    
                        reply(".update AUTO_REACT:true");
                        reply(".restart");
                    break;
                    case '8.2':    
                        reply(".update AUTO_REACT:false");
                        reply(".restart");
                    break;              
                    case '9.1':    
                        reply(".update HEART_REACT:true");
                        reply(".restart");
                    break;
                    case '9.2':    
                        reply(".update HEART_REACT:false");
                        reply(".restart");
                    break;              
                    case '10.1':    
                        reply(".update OWNER_REACT:true");
                        reply(".restart");
                    break;
                    case '10.2':    
                        reply(".update OWNER_REACT:false");
                        reply(".restart");
                    break;              
                    case '11.1':    
                        reply(".update ALWAYS_ONLINE:true");
                        reply(".restart");
                    break;
                    case '11.2':    
                        reply(".update ALWAYS_ONLINE:false");
                        reply(".restart");
                    break;              
                    case '12.1':    
                        reply(".update ALLWAYS_OFFLINE:true");
                        reply(".restart");
                    break;
                    case '12.2':    
                        reply(".update ALLWAYS_OFFLINE:false");
                        reply(".restart");
                    break;              
                    case '13.1':    
                        reply(".update ALWAYS_RECORDING:true");
                        reply(".restart");
                    break;
                    case '13.2':    
                        reply(".update ALWAYS_RECORDING:false");
                        reply(".restart");
                    break;              
                    case '14.1':    
                        reply(".update ALWAYS_TYPING:true");
                        reply(".restart");
                    break;
                    case '14.2':    
                        reply(".update ALWAYS_TYPING:false");
                        reply(".restart");
                    break;              
                    case '15.1':    
                        reply(".update ANTI_LINK:true");
                        reply(".restart");
                    break;
                    case '15.2':    
                        reply(".update ANTI_LINK:false");
                        reply(".restart");
                    break;              
                    case '16.1':    
                        reply(".update ANTI_BOT:true");
                        reply(".restart");
                    break;
                    case '16.2':    
                        reply(".update ANTI_BOT:false");
                        reply(".restart");
                    break;              
                    case '17.1':    
                        reply(".update ANTI_BAD_WORDS_ENABLED:true");
                        reply(".restart");
                    break;
                    case '17.2':    
                        reply(".update ANTI_BAD_WORDS_ENABLED:false");
                        reply(".restart");
                    break;              
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }
                
                       // Auto-delete the option selection after 10 seconds
                setTimeout(async () => {
                    await conn.sendMessage(from, { delete: msg.key });
                }, 2000); // 10 seconds timeout for deletion

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
