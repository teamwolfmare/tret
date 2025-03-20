const config = require('../config')
const {cmd , commands} = require('../command')



cmd({
    pattern: "about",
    desc: "To get the bot informations.",
    react: "ℹ️",
    category: "main",
    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{


let about = ` 
👋 𝐇𝐄𝐋𝐋𝐎𝐖 𝐓𝐇𝐄𝐈𝐑 ${senderNumber}
 `

return await conn.sendMessage(from,{image: {url: `url image`},caption:about},{quoted: mek})

}catch(e){

console.log(e)

reply(`${e}`)

}

})




