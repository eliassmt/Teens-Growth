export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'AI service is not configured yet.' });
  }

  const { message, history = [] } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Please enter a question.' });
  }
  if (message.length > 1000) {
    return res.status(400).json({ error: 'Please keep your question under 1,000 characters.' });
  }

  const safeHistory = Array.isArray(history)
    ? history.filter(x => x && (x.role === 'user' || x.role === 'assistant') && typeof x.content === 'string').slice(-8)
    : [];

  const instructions = `You are TEENUP AI, a friendly educational assistant for teenagers.
Your job is to help users learn, explore careers, develop projects, practice skills, and understand school topics.
Use age-appropriate, clear language. Encourage learning rather than doing schoolwork dishonestly.
Do not ask for or encourage sharing passwords, precise home addresses, private contact details, financial account information, or other sensitive personal data.
Do not provide sexual or adult content, dangerous activity instructions, instructions for weapons or drugs, gambling assistance, or ways to bypass age restrictions or safety rules.
For health, legal, financial, or other high-stakes topics, provide general educational information and encourage the user to involve a trusted adult or qualified professional when appropriate.
If a user asks for something unsafe, briefly decline that part and redirect to a safe educational alternative.
Never claim to be a human, teacher, parent, counselor, or emergency service.
Keep answers practical and reasonably concise. When teaching, use steps, examples, and a short practice question when useful.`;

  const input = [
    ...safeHistory.map(x => ({ role: x.role, content: x.content })),
    { role: 'user', content: message.trim() }
  ];

  try {
    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
        instructions,
        input,
        max_output_tokens: 700
      })
    });

    const data = await r.json();
    if (!r.ok) {
      console.error('OpenAI API error:', data);
      return res.status(502).json({ error: 'The AI service returned an error. Please try again.' });
    }

    const reply = data.output_text || data.output?.flatMap(item => item.content || []).map(c => c.text || '').join('') || '';
    if (!reply) return res.status(502).json({ error: 'No AI response was returned.' });

    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to connect to the AI service.' });
  }
}
