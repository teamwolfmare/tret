const { cmd, commands } = require('../command');

const { fetchJson } = require('../lib/functions');

const domain = `https://manu-ofc-api-site-6bfcbe0e18f6.herokuapp.com`;

const api_key = `Manul-Ofc-Sl-Sub-Key-9`;

cmd({

    pattern: "sinhalasub",

    alias: ["mv", "sisub"],

    react: '📺',

    category: "download",

    desc: "Search movies on sinhalasub and get download links",

    filename: __filename

}, async (conn, m, mek, { from, isMe, isOwner, q, reply }) => {

    try {

        // Check if search query is provided

        if (!q || q.trim() === '') return await reply('*Give me a movie name*');

        if (!isMe && !isOwner) return await reply('*🚫If You are Not a Premium User 🚫*');

        // Fetch search results from API

        const manu = await fetchJson(`${domain}/api/sl-sub-search?query=${q}&apikey=${api_key}`);

        const movieData = manu.data.data; // Use the `data.data` array

        // Check if the API returned valid results (array of movies)

        if (!Array.isArray(movieData) || movieData.length === 0) {

            return await reply(`No results found for: ${q}`);

        }

        // Limit to first 25 results

        const searchResults = movieData.slice(0, 25);

        // Format and send the search results message

        let resultsMessage = `
  *🎬 ᴍᴠ ꜱᴇᴀʀᴄʜ🎬*
━━━━━━━━━━━━♚━━━━━━━━━━━━\n

 🔎 𝐒𝐞𝐚𝐫𝐜𝐡 𝐍𝐚𝐦𝐞 = ${q} :\nSearch Results From = ☛ sinhalasub.net ☚\n\n`;

        searchResults.forEach((result, index) => {

            const title = result.title || 'No title available';

            const link = result.link || 'No link available';

            const thumbnail = result.thumbnail || 'https://via.placeholder.com/150'; // Fallback if thumbnail is missing

            resultsMessage += `*${index + 1}. ▏|* ${title}\n\n`;

            // You can also display the thumbnail in the results if needed

        });

        const sentMsg = await conn.sendMessage(m.chat, {

            image: { url: searchResults[0].thumbnail }, // Show the thumbnail of the first result

            caption: `${resultsMessage}\n\n> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑`

        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        // Event listener for user's selection of a movie from search results

        const handleSearchReply = async (replyMek, selectedNumber) => {

            const selectedMovie = searchResults[selectedNumber - 1];

            const response = await fetchJson(`${domain}/api/slsub-movie-info?url=${encodeURIComponent(selectedMovie.link)}&apikey=${api_key}`);

            

            try {

                const movieDetails = response.data;

                const downloadLinks = movieDetails.downloadLinks || [];

                if (downloadLinks.length === 0) {

                    return await reply('No download links found.');

                }

                let downloadMessage = `☘️ *${movieDetails.title}*\n\n*🔢𝘙𝘌𝘗𝘓𝘠 𝘉𝘌𝘓𝘖𝘞 𝘕𝘜𝘔𝘉𝘌𝘙𝘚:*\n`;

                downloadLinks.forEach((link, index) => {

                    downloadMessage += `*${index + 1}. ◊◊*  ${link.quality} ═  *${link.size}*\n`;
                    

                });

                const pixelDrainMsg = await conn.sendMessage(m.chat, {

                    image: { url: selectedMovie.thumbnail }, // Show the selected movie's thumbnail

                    caption: `${downloadMessage}\n\n> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑`

                }, { quoted: replyMek });

                const pixelDrainMessageID = pixelDrainMsg.key.id;

                // Event listener for the user to choose download quality

                const handleDownloadReply = async (pdReply, qualityNumber) => {

                    const selectedLink = downloadLinks[qualityNumber - 1];

                    const file = selectedLink.link;

                    const fileResponse = await fetchJson(`${domain}/api/slsub-direct-link?url=${encodeURIComponent(file)}&apikey=${api_key}`);

                    const downloadLink = fileResponse.data.downloadLink;

                    const fileId = downloadLink.split('/').pop();

                    await conn.sendMessage(from, { react: { text: '🎞️', key: mek.key } });

                    const directDownloadUrl = `https://pixeldrain.com/api/file/${fileId}`;

                    await conn.sendMessage(from, { react: { text: '📽️', key: mek.key } });

                    await conn.sendMessage(from, {

                                document: {

                                    url: directDownloadUrl

                                },

                                mimetype: 'video/mp4',

                                fileName: `📽️ ᴍᴠ📽️ ${movieDetails.title} - ${selectedLink.quality}.mp4`,

                                caption: `> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐔𝐑𝐎𝐑𝐀 𝐌𝐃 👑`

                            }, { quoted: pdReply });

                    await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });

                };

                // Listen for user's reply to select the download quality

                conn.ev.on('messages.upsert', async (pdUpdate) => {

                    const pdReply = pdUpdate.messages[0];

                    if (!pdReply.message) return;

                    const pdMessageType = pdReply.message.conversation || pdReply.message.extendedTextMessage?.text;

                    const isReplyToPixelDrainMsg = pdReply.message.extendedTextMessage && pdReply.message.extendedTextMessage.contextInfo.stanzaId === pixelDrainMessageID;

                    if (isReplyToPixelDrainMsg) {

                        const qualityNumber = parseInt(pdMessageType.trim());

                        if (!isNaN(qualityNumber) && qualityNumber > 0 && qualityNumber <= downloadLinks.length) {

                            handleDownloadReply(pdReply, qualityNumber);

                        } else {

                            await reply('Invalid selection. Please reply with a valid number.');

                        }

                    }

                });

            } catch (error) {

                console.error('Error fetching movie details:', error);

                await reply('Sorry, something went wrong while fetching the movie details.');

            }

        };

        // Listen for user to select a movie from search results

        conn.ev.on('messages.upsert', async (messageUpdate) => {

            const replyMek = messageUpdate.messages[0];

            if (!replyMek.message) return;

            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;

            const isReplyToSentMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {

                const selectedNumber = parseInt(messageType.trim());

                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= searchResults.length) {

                    handleSearchReply(replyMek, selectedNumber);

                } else {

                    await reply('Invalid selection. Please reply with a valid number.');

                }

            }

        });

    } catch (error) {

        console.error('Error in sinhala command:', error);

        await reply('Sorry, something went wrong. Please try again later.');

    }

});                                      
