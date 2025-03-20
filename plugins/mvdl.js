onst { cmd } = require('../command');

const axios = require('axios');

const fs = require('fs').promises;

const path = require('path');

// Powerd by Thenux-AI & NETHUMAX

cmd({

    pattern: "mvdl",

    alias: ["moviefire", "moviesearch"],

    react: "📺",

    desc: "Search Movies on Fire Movies Hub",

    category: "media",

    use: ".firemovie <movie name>",

    filename: __filename

}, async (conn, mek, m, { from, reply, args, q }) => {

    try {

        // Check if query is provided

        if (!q) {

            return await reply(`*Please Give Me A Movie Full Name To Search*`);

        }

        // React to show processing

        await m.react("🔍");

        // Encode query for URL

        const encodedQuery = encodeURIComponent(q);

        // API Request for movie search

        const searchResponse = await axios.get(`https://www.dark-yasiya-api.site/movie/firemovie/search?text=${encodedQuery}`);

        // Validate search response

        if (!searchResponse.data || !searchResponse.data.status) {

            return await reply("❌ No movies found or API error.");

        }

        // Extract movies

        const movies = searchResponse.data.result.data;

        // Check if movies exist

        if (movies.length === 0) {

            return await reply(`❌ No movies found for "${q}".`);

        }

        // Prepare movie list message

        let desc = `

🔎 SEARCH RESULTS FOR = *${q}*

*乂 QUEEN AURORA MD MOVIE SEARCH🎬*

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓

${movies.map((movie, index) => `*0${index + 1}.   ▏|*  ${movie.title} (${movie.year})
`).join('\n')}
    
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑`;

        // Send the movie list with context

        const sentMsg = await conn.sendMessage(

            from,

            {

                text: desc,

                contextInfo: {

                    externalAdReply: {

                        title: `QUEEN AURORA MD Movie Search`,

                        body: `Search results for: ${q}`,

                        thumbnailUrl: movies[0].image,

                        sourceUrl: movies[0].link,

                        mediaType: 1,

                        renderLargerThumbnail: true

                    },

                },

            },

            { quoted: mek }

        );

        const messageID = sentMsg.key.id;

        // Listen for user's response

        conn.ev.on("messages.upsert", async (messageUpdate) => {

            const mek = messageUpdate.messages[0];

            if (!mek.message) return;

            

            const messageType = 

                mek.message.conversation || 

                mek.message.extendedTextMessage?.text;

            

            const isReplyToSentMsg =

                mek.message.extendedTextMessage &&

                mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {

                // Check if the reply is a valid number

                const selectedIndex = parseInt(messageType) - 1;

                

                if (selectedIndex >= 0 && selectedIndex < movies.length) {

                    const selectedMovie = movies[selectedIndex];

                    try {

                        // Fetch detailed movie information

                        const detailResponse = await axios.get(`https://www.dark-yasiya-api.site/movie/firemovie/movie?url=${encodeURIComponent(selectedMovie.link)}`);

                        if (!detailResponse.data || !detailResponse.data.status) {

                            return await reply("❌ Failed to fetch movie details.");

                        }

                        const movieDetails = detailResponse.data.result.data;

                        // React to the selection

                        await conn.sendMessage(from, {

                            react: { text: "🎬", key: mek.key }

                        });

                        // Prepare detailed movie message

                        const detailMessage = `

*🎬QUEEN AURORA MD MOVIE DETAILS*🎬

▫️☘️▫️ *Tɪᴛʟᴇ :* ${movieDetails.title}| Sinhala Subtitles
━━━━━━━━━━━━━━━━━━━━━━━━━
▫️📅➣ *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${movieDetails.date}
▫️⏰➣ *Dᴜʀᴀᴛɪᴏɴ :* ${movieDetails.duration}
▫️🧛‍♂️➣ *Cᴀꜱᴛ :* ${movieDetails.actors}
▫️🎭➣ *Gᴇɴʀᴇꜱ :* ${movieDetails.category.join(", ")}
▫️👨🏻‍💼➣ *Dɪʀᴇᴄᴛᴏʀ :* ${movieDetails.director}
▫️⛔➣ *TMDB Rᴀᴛᴇ :* ${movieDetails.tmdbRate}
▫️📝➣ *Dᴇꜱᴄʀɪᴘᴛɪᴏɴ :* ${movieDetails.description}
────────────────────────

*🔢𝘙𝘌𝘗𝘓𝘠 𝘉𝘌𝘓𝘖𝘞 𝘕𝘜𝘔𝘉𝘌𝘙*:

${movieDetails.dl_links.map((link, index) =>`*0${index + 1}. ${link.quality}*(${link.size})`
).join('\n')}

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑`;
                        
                        // Send movie details with main image

                        const mediaMessage = await conn.sendMessage(from, {

                            image: { url: movieDetails.mainImage },

                            caption: detailMessage

                        }, { quoted: mek });

                        // Store movie details globally for download option

                        global.movieDownloadDetails = {

                            links: movieDetails.dl_links,

                            title: movieDetails.title

                        };

                        // Send download instruction message

                        /*await conn.sendMessage(from, {

                            text: `

*🔽 DOWNLOAD OPTIONS*

Reply with the number corresponding to the download quality:

${movieDetails.dl_links.map((link, index) => 

    `*${index + 1}.* ${link.quality} (${link.size})`

).join('\n')}

> Choose your preferred download option`,

                            contextInfo: {

                                externalAdReply: {

                                    title: "Movie Download",

                                    body: `Download ${movieDetails.title}`,

                                    mediaType: 1

                                }

                            }

                        }, { quoted: mediaMessage });*/

                    } catch (detailError) {

                        console.error("Movie Detail Fetch Error:", detailError);

                        await reply("❌ Failed to fetch movie details.");

                    }

                } else {

                    // Invalid number selected

                    await conn.sendMessage(from, {

                        react: { text: "❓", key: mek.key }

                    });

                    reply("Please enter a valid movie number!");

                }

            } else if (global.movieDownloadDetails) {

                // Handle download option selection

                const selectedDownloadIndex = parseInt(messageType) - 1;

                

                if (selectedDownloadIndex >= 0 && 

                    selectedDownloadIndex < global.movieDownloadDetails.links.length) {

                    

                    const selectedDownload = global.movieDownloadDetails.links[selectedDownloadIndex];

                    

                    // Send download link and file

                    await conn.sendMessage(from, {

                        react: { text: "📥", key: mek.key }

                    });

                    // Show processing message

                    const processingMsg = await reply(`🔄 Preparing download for ${global.movieDownloadDetails.title}...`);

                    try {

                        // Download the file

                        const downloadResponse = await axios({

                            method: 'get',

                            url: selectedDownload.link,

                            responseType: 'arraybuffer',

                            maxContentLength: Infinity,

                            maxBodyLength: Infinity,

                            headers: {

                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'

                            }

                        });

                        // Generate a random filename

                        const sanitizedTitle = global.movieDownloadDetails.title

                            .replace(/[^a-zA-Z0-9]/g, '_')

                            .replace(/__+/g, '_')

                            .substring(0, 50);

                        

                        const filename = `${sanitizedTitle}_${selectedDownload.quality}.mp4`;

                        const tempFilePath = path.join(__dirname, 'temp', filename);

                        // Ensure temp directory exists

                        await fs.mkdir(path.join(__dirname, 'temp'), { recursive: true });

                        // Write the file temporarily

                        await fs.writeFile(tempFilePath, downloadResponse.data);

                        // Delete processing message

                        await conn.sendMessage(from, { delete: processingMsg.key });

                        // Send the file

                        const fileMessage = await conn.sendMessage(from, {

                            document: { 

                                url: tempFilePath 

                            },

                            mimetype: 'video/mp4',

                            fileName: filename,

                            caption: `

*🎬 DOWNLOADED MOVIE*

☘️ *Tɪᴛʟᴇ*: ${global.movieDownloadDetails.title}

📊 *Qᴜᴀʟɪᴛʏ*: ${selectedDownload.quality}

📦 *Sɪᴢᴇ*: ${selectedDownload.size}

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑`

                        }, { quoted: mek });

                        // Optional: Send progress message

                        await reply(`✅ *Download Complete*\n📥 File: ${filename}`);

                        // Clean up temporary file after a delay

                        setTimeout(async () => {

                            try {

                                await fs.unlink(tempFilePath);

                            } catch (cleanupError) {

                                console.log("Temp file cleanup error:", cleanupError);

                            }

                        }, 5 * 60 * 1000); // 5 minutes delay

                        // React to successful download

                        await conn.sendMessage(from, {

                            react: { text: "✅", key: mek.key }

                        });

                    } catch (downloadError) {

                        console.error("Movie Download Error:", downloadError);

                        

                        // Delete processing message

                        await conn.sendMessage(from, { delete: processingMsg.key });

                        // Detailed error handling

                        let errorMessage = "❌ Download failed. ";

                        if (downloadError.response) {

                            switch (downloadError.response.status) {

                                case 404:

                                    errorMessage += "Download link is no longer valid.";

                                    break;

                                case 403:

                                    errorMessage += "Access to the file is restricted.";

                                    break;

                                case 500:

                                    errorMessage += "Server error occurred.";

                                    break;

                                default:

                                    errorMessage += `HTTP Error: ${downloadError.response.status}`;

                            }

                        } else if (downloadError.code) {

                            switch (downloadError.code) {

                                case 'ECONNABORTED':

                                    errorMessage += "Download timed out.";

                                    break;

                                case 'ENOTFOUND':

                                    errorMessage += "Unable to connect to download server.";

                                    break;

                                default:

                                    errorMessage += `Network Error: ${downloadError.code}`;

                            }

                        } else {

                            errorMessage += "An unexpected error occurred.";

                        }

                        // Send error message

                        await reply(errorMessage);

                        // React to error

                        await conn.sendMessage(from, {

                            react: { text: "❌", key: mek.key }

                        });

                    }

                    // Clean up global store

                    delete global.movieDownloadDetails;

                }

            }

        });

    } catch (error) {

        console.error("Movie Search Error:", error);

        await reply("❌ An error occurred during the movie search.");

    }

});
