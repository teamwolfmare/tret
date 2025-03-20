const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "aiimg",
    alias: ["aiimg", "generateimg", "aiimage"],
    desc: "Generate AI Images using Stable Diffusion",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        // Check if prompt is provided
        if (!q) return reply(`
*AI IMAGE GENERATOR* 🖼️

Usage: .aiimg <image description>
Example: .aiimg Beautiful landscape with mountains

*Tips:*
- Be specific in your description
- Use descriptive words
- Mention style, color, mood
`);

        // React to show processing
        await m.react("🔄");

        // Construct API URL with the prompt
        const apiUrl = `https://api.davidcyriltech.my.id/diffusion?prompt=${encodeURIComponent(q)}`;

        // Fetch the image from the API
        const response = await axios({
            method: 'get',
            url: apiUrl,
            responseType: 'arraybuffer',
            timeout: 60000 // 60 seconds timeout
        });

        // Check if response is valid
        if (!response.data) {
            return reply("❌ Failed to generate image. No data received.");
        }

        // Send the generated image
        await conn.sendMessage(from, {
            image: response.data,
            caption: `*AI IMAGE GENERATOR*

*📝 Prompt:* ${q}

*powered by QUEEN AURORA md*
*Model:* Stable Diffusion
`,
            quoted: mek
        });

        // React to successful image generation
        await m.react("✅");

    } catch (error) {
        console.error("AI Image Generation Error:", error);
        
        // React to error
        await m.react("❌");

        // Detailed error handling
        if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            if (error.response.status === 429) {
                return reply("⏳ Too many requests. Please try again later.");
            } else if (error.response.status === 500) {
                return reply("🚫 Server error. Unable to generate image.");
            } else {
                return reply(`❌ Error: ${error.response.status} - ${error.response.statusText}`);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            return reply("🌐 No response received from the server. Check your internet connection.");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return reply(`❌ An unexpected error occurred: ${error.message}`);
        }
    }
});
