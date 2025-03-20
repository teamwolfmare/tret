const { Buffer } = require('buffer');
const axios = require('axios');
const { cmd, commands } = require('../command')
const fs = require('fs');
const util = require('util');
const streamPipeline = util.promisify(require('stream').pipeline);
const config = require('../config'); // Assuming you have an API key stored in config
const Esana = require('@sl-code-lords/esana-news');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const cheerio = require('cheerio')
const ffmpeg = require('fluent-ffmpeg')

//esana
cmd({
    pattern: "esananews",
    react: '🎙️',
    desc: "To see esana news",
    category: "search",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const latst = await api.latest_id();
            const nws = latst.results.news_id
            let nn = q || nws
            const ress = await api.news(nn);
            const res = ress.results;

            const txt2 = await conn.sendMessage(from, {image: 
	    {url: res.COVER},caption: `\n*┃◉* *⇨ ᴛɪᴛᴇʟ :*
 ${res.TITLE}\n\n*┃◉* *⇨ ᴅᴀᴛᴇ :*
 ${res.PUBLISHED}\n\n*┃◉* *⇨ ᴜʀʟ :*
 ${res.URL}\n\n*┃◉* *⇨ Description :*
 ${res.DESCRIPTION}\n\nQUEEN AURORA MD`},
			{ quoted: mek });
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       



cmd({
    pattern: "news",
    desc: "Get the latest news headlines.",
    category: "search",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiKey="0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        if (!articles.length) return reply("No news articles found.");

        // Send each article as a separate message with image and title
        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `
📰 *${article.title}*
⚠️ _${article.description}_
🔗 _${article.url}_

QUEEN AURORA MD
            `;

            console.log('Article URL:', article.urlToImage); // Log image URL for debugging

            if (article.urlToImage) {
                // Send image with caption
                await conn.sendMessage(from, { image: { url: article.urlToImage }, caption: message });
            } else {
                // Send text message if no image is available
                await conn.sendMessage(from, { text: message });
            }
        };
    } catch (e) {
        console.error("Error fetching news:", e);
        reply("Could not fetch news. Please try again later.");
    }
});


cmd({
    pattern: "movie",
    desc: "Fetch detailed information about a movie.",
    category: "other",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=76cb7f39`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `
🎬 *Movie Information* 🎬

🎥 *Title:* ${data.Title}

📅 *Year:* ${data.Year}

🌟 *Rated:* ${data.Rated}

📆 *Released:* ${data.Released}

⏳ *Runtime:* ${data.Runtime}

🎭 *Genre:* ${data.Genre}

🎬 *Director:* ${data.Director}

✍️ *Writer:* ${data.Writer}

🎭 *Actors:* ${data.Actors}

📝 *Plot:* ${data.Plot}

🌍 *Language:* ${data.Language}

🇺🇸 *Country:* ${data.Country}

🏆 *Awards:* ${data.Awards}

⭐ *IMDB Rating:* ${data.imdbRating}

🗳️ *IMDB Votes:* ${data.imdbVotes}
`;

        // Define the image URL
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        // Send the movie information along with the poster image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\nQUEEN AURORA MD`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

//=================

let activeGroups = {};
let lastNewsTitles = {
    hiru: {},
    sirasa: {},
    derana: {}
};

// Function to get the latest news from Hiru
async function getHiruNews() {
    try {
        const response = await axios.get('https://dark-yasiya-news-apis.vercel.app/api/hiru');
        if (response.data.status) {
            const news = response.data.result;
            return {
                title: news.title,
                content: news.desc,
                date: news.date,
                url: news.url,
                image: news.image
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Hiru News: ${err.message}`);
        return null;
    }
}

// Function to get the latest news from Sirasa
async function getSirasaNews() {
    try {
        const response = await axios.get('https://dark-yasiya-news-apis.vercel.app/api/sirasa');
        if (response.data.status) {
            const news = response.data.result;
            return {
                title: news.title,
                content: news.desc,
                date: news.date,
                url: news.url,
                image: news.image
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Sirasa News: ${err.message}`);
        return null;
    }
}

// Function to get the latest news from Derana
async function getDeranaNews() {
    try {
        const response = await axios.get('https://dark-yasiya-news-apis.vercel.app/api/derana');
        if (response.data.status) {
            const news = response.data.result;
            return {
                title: news.title,
                content: news.desc,
                date: news.date,
                url: news.url,
                image: news.image
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Derana News: ${err.message}`);
        return null;
    }
}

// Function to send news to a group
async function sendNews(conn, groupId, news, source) {
    if (news) {
        // Check if the title is different before sending
        if (lastNewsTitles[source][groupId] !== news.title) {
            lastNewsTitles[source][groupId] = news.title; // Update the last news title sent to the group
            
            // Constructing the message
            let message = `📰 *${source} News*\n\n*Title:* ${news.title}\n\n*Description:* ${news.content}\n\n*Published On:* ${news.date}`;
            if (news.url) message += `\n\n*Read more:* ${news.url}`;
            message += `\n\nQUEEN AURORA MD`; // Add caption

            // Check if there is an image to send
            if (news.image) {
                await conn.sendMessage(groupId, {
                    image: { url: news.image },
                    caption: message
                });
            } else {
                await conn.sendMessage(groupId, { text: message });
            }
        }
    }
}

// Function to check and post the latest news
async function checkAndPostNews(conn, groupId) {
    const hiruNews = await getHiruNews();
    const sirasaNews = await getSirasaNews();
    const deranaNews = await getDeranaNews();

    // Send Hiru News
    await sendNews(conn, groupId, hiruNews, 'hiru');

    // Send Sirasa News
    await sendNews(conn, groupId, sirasaNews, 'sirasa');

    // Send Derana News
    await sendNews(conn, groupId, deranaNews, 'derana');
}

// Command to activate 24/7 news service in a group
cmd({
    pattern: "onnews",
    desc: "Enable Sri Lankan news updates in this group",
    isGroup: true,
    react: "📰",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, participants }) => {
    try {
        const isAdmin = participants.some(p => p.id === mek.sender && p.admin);
        const isBotOwner = mek.sender === conn.user.jid;

        if (isAdmin || isBotOwner) {
            if (!activeGroups[from]) {
                activeGroups[from] = true;
                await conn.sendMessage(from, { text: "📰 24/7 News Activated." });

                // Start the interval if it's not already active
                if (!activeGroups['interval']) {
                    activeGroups['interval'] = setInterval(async () => {
                        for (const groupId in activeGroups) {
                            if (activeGroups[groupId] && groupId !== 'interval') {
                                await checkAndPostNews(conn, groupId);
                            }
                        }
                    }, 60000); // Run every 60 seconds
                }
            } else {
                await conn.sendMessage(from, { text: "📰 24/7 News Already Activated." });
            }
        } else {
            await conn.sendMessage(from, { text: "🚫 This command can only be used by group admins or the bot owner." });
        }
    } catch (e) {
        console.error(`Error in sprikynews command: ${e.message}`);
        await conn.sendMessage(from, { text: "Failed to activate the news service." });
    }
});

// Command to deactivate the 24/7 news service
cmd({
    pattern: "offnews",
    desc: "Disable Sri Lankan news updates in this group",
    isGroup: true,
    react: "🛑",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, participants }) => {
    try {
        const isAdmin = participants.some(p => p.id === mek.sender && p.admin);
        const isBotOwner = mek.sender === conn.user.jid;

        if (isAdmin || isBotOwner) {
            if (activeGroups[from]) {
                delete activeGroups[from];
                await conn.sendMessage(from, { text: "🛑 24/7 News Deactivated." });

                // Stop the interval if no groups are active
                if (Object.keys(activeGroups).length === 1 && activeGroups['interval']) {
                    clearInterval(activeGroups['interval']);
                    delete activeGroups['interval'];
                }
            } else {
                await conn.sendMessage(from, { text: "🛑 24/7 News is not active in this group." });
            }
        } else {
            await conn.sendMessage(from, { text: "🚫 This command can only be used by group admins or the bot owner." });
        }
    } catch (e) {
        console.error(`Error in stopsprikynews command: ${e.message}`);
        await conn.sendMessage(from, { text: "Failed to deactivate the news service." });
    }
});
