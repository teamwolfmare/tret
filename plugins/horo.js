const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')
const axios = require('axios')


cmd({
            pattern: "horo",
            category: "search",
            react: "🌀",
            desc: "Gives horoscope info of user.",
            use: '<sign>\n:Example: horo libra',
            filename: __filename,
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply("Provide me a sign!")
            try {
                const URL = `https://aztro.sameerkumar.website/?sign=${text}&day=today`;
                fetch(URL, {
                        method: 'POST'
                    })
                    .then(response => response.json())
                    .then(json => {
                        const date = json.current_date;
                        console.log(date);
                        let textw = "";
                        textw += `*🌟 Horoscope of  ${text}*\n\n`;
                        textw += `*Current Date:* ${json.current_date}.\n`;
                        textw += `*Sign:* ${text}.\n`;
                        textw += `*Lucky Time:* ${json.lucky_time}.\n`;
                        textw += `*Compatibility:* ${json.compatibility}.\n`;
                        textw += `*Lucky Number:* ${json.lucky_number}.\n`;
                        textw += `*Lucky Color:* ${json.color}.\n`;
                        textw += `*Today Mood:* ${json.mood}.\n`;
                        textw += `*Overall:* ${json.description}.\n`;
                        citel.reply(textw)
                    });

            } catch (e) {
                console.log(e)
            }
        }
    )
