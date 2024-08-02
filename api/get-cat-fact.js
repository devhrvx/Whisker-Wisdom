let previousFacts = [];
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
                    { role: "system", content: "You're an expert in fun, brief cat facts, using cat puns and ending with \"meow\" Responses are short, unique, and may include emojis." },
                    { role: "user", content: "Tell me a very short but fun cat fact. Don't repeat the last one." }
                ],
                max_tokens: 60
            })
        });
        let maxSimilarity = 1;
        let attempts = 0;

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
