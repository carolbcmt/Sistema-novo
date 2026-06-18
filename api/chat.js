export default async function handler(req, res) {
  const response = await fetch(
    "https://api.anthropic.com/v1/messages",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(req.body)
    }
  );
  const data = await response.json();
  res.status(200).json(data);
}
4. Clique em "Commit changes"
A Vercel vai reimplantar automaticamente e a IA vai funcionar! 📍Claude Fable 5 está indisponível no momento.S
