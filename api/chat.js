export default async function handler(req, res) {
  try {
    const body = req.body;
    const bodyStr = JSON.stringify(body);
    const hasPDF = bodyStr.includes('"document"') || bodyStr.includes('application/pdf');
    
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    };
    
    if (hasPDF) {
      headers["anthropic-beta"] = "pdfs-2024-09-25";
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers,
      body: bodyStr
    });

    const data = await response.json();
    if (data.error) console.error("Anthropic API error:", JSON.stringify(data.error));
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Handler error:", err.message);
    res.status(500).json({ error: { message: err.message } });
  }
}
