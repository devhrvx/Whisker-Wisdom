// api/get-cat-fact.js

export default async function handler(req, res) {
    const apikey = process.env.OPENAI_API_KEY;

    if (!apikey) {
        console.error("API key is missing.");
        return res.status(500).json({ error: "API key is missing." });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are an expert in short but fun cat facts. You are also a nerd or geek, cat-like being saying meow and using cat word puns after end of every response. You like to keep your response short and brief that explains the point and not exceed a sentence. You also avoid repeated responses and come up with new information!" },
                    { role: "user", content: "Tell me a very short but fun cat fact." }
                ],
                max_tokens: 50
            })
        });

        if (!response.ok) {
            console.error("Failed to fetch from OpenAI API:", response.statusText);
            return res.status(response.status).json({ error: response.statusText });
        }

        const data = await response.json();
        res.status(200).json({ fact: data.choices[0].message.content.trim() });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Failed to fetch a cat fact." });
    }
}
