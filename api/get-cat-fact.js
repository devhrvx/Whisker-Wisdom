import stringSimilarity from 'string-similarity';

const previousFacts = [];

export default async function handler(req, res) {
    const apikey = process.env.OPENAI_API_KEY;

    if (!apikey) {
        console.error("API key is missing.");
        return res.status(500).json({ error: "API key is missing." });
    }

    try {
        let fact = '';
        let attempts = 0;
        const maxAttempts = 5;

        while (attempts < maxAttempts) {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apikey}`
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                        { role: "system", content: "You're an expert in fun, brief cat facts, using cat puns and ending with \"meow\" Responses are short, unique, and may include emojis." },
                        { role: "user", content: "Tell me a very short but fun cat fact." }
                    ],
                    max_tokens: 60
                })
            });

            if (!response.ok) {
                console.error("Failed to fetch from OpenAI API:", response.statusText);
                return res.status(response.status).json({ error: response.statusText });
            }

            const data = await response.json();
            fact = data.choices[0].message.content.trim();

            const matches = previousFacts.map(prevFact => stringSimilarity.compareTwoStrings(prevFact, fact));
            const maxSimilarity = Math.max(...matches); //spread

            if (maxSimilarity < 0.8) {S
                break;
            }

            attempts++;
        }

        if (attempts === maxAttempts) {
            console.error("Could not generate a unique cat fact after several attempts.");
            return res.status(500).json({ error: "Could not generate a unique cat fact." });
        }

        previousFacts.push(fact);

        res.status(200).json({ fact });

    } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(500).json({ error: "Failed to fetch a cat fact." });
    }
}
