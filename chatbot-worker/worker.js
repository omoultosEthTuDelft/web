const KNOWLEDGE_URL = 'https://omoultosethtudelft.github.io/web/chatbot-knowledge.json';
const CACHE_TTL = 3600; // 1 hour

const INSTRUCTIONS = `You are Otto's AI assistant embedded on his academic website. You answer questions about Othonas (Otto) A. Moultos and his research group at TU Delft.

IMPORTANT RULES:
- All the knowledge you need is provided below in this prompt. USE IT to answer questions directly and confidently.
- NEVER say you "don't have access to the website" or "can't browse the internet" — you already have all the website's content right here.
- NEVER say "the information is not provided" if the answer IS in this prompt. Read carefully before answering.
- Answer questions using the facts below. Be helpful, concise, and friendly.
- When relevant, include links to specific pages on the website.
- Only if a question is truly not covered below, say so honestly.`;

const ALLOWED_ORIGIN = 'https://omoultosethtudelft.github.io';

let cachedKnowledge = null;
let cacheTime = 0;

async function getKnowledge() {
  const now = Date.now();
  if (cachedKnowledge && (now - cacheTime) < CACHE_TTL * 1000) {
    return cachedKnowledge;
  }

  const response = await fetch(KNOWLEDGE_URL, {
    cf: { cacheTtl: CACHE_TTL },
  });

  if (!response.ok) {
    if (cachedKnowledge) return cachedKnowledge; // use stale cache on error
    throw new Error(`Failed to fetch knowledge base: ${response.status}`);
  }

  cachedKnowledge = await response.json();
  cacheTime = now;
  return cachedKnowledge;
}

function buildSystemPrompt(knowledge) {
  const siteUrl = knowledge.siteUrl;

  // Recent publications (last 25) with full details, rest just counted
  const recentPubs = knowledge.publications.slice(0, 25);
  const pubLines = recentPubs.map(
    (p) => `${p.number} "${p.title}" — ${p.authors} — ${p.venue}`
  );
  const totalPubs = knowledge.publications.length;

  return `${INSTRUCTIONS}

Website: ${siteUrl}
Last updated: ${knowledge.lastUpdated}

### Current Team (${siteUrl}/people)
${knowledge.pages.people}

### Alumni (${siteUrl}/alumni)
${knowledge.pages.alumni}

### Teaching (${siteUrl}/teaching/)
${knowledge.pages.teaching}

### Scientific Software (${siteUrl}/software/)
${knowledge.pages.software}

### Research Projects (${siteUrl}/projects)
${knowledge.pages.projects}

### Photos (${siteUrl}/photos/)
${knowledge.pages.photos}

### Simulation Gallery (${siteUrl}/cool/)
${knowledge.pages.simulations}

### About / Home (${siteUrl})
${knowledge.pages.home.slice(0, 4000)}

## Publications (${totalPubs} total) — full list: ${siteUrl}/publications/
Most recent ${recentPubs.length} publications:
${pubLines.join('\n')}
Plus ${totalPubs - recentPubs.length} earlier publications (2009-2022) on molecular simulations, polymers, deep eutectic solvents, hydrogen, CO2 capture, transport properties, and more.
`;
}

function corsHeaders(origin) {
  const allowedOrigins = [ALLOWED_ORIGIN, 'http://localhost:4000', 'http://127.0.0.1:4000'];
  const effectiveOrigin = allowedOrigins.includes(origin) ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': effectiveOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    }

    try {
      const { message, history } = await request.json();

      if (!message || typeof message !== 'string') {
        return new Response(JSON.stringify({ error: 'Missing or invalid "message" field' }), {
          status: 400,
          headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
        });
      }

      // Fetch knowledge base dynamically
      const knowledge = await getKnowledge();
      const systemPrompt = buildSystemPrompt(knowledge);

      // Build messages array for Groq (OpenAI-compatible format)
      const messages = [{ role: 'system', content: systemPrompt }];

      if (Array.isArray(history)) {
        for (const entry of history) {
          messages.push({
            role: entry.role === 'user' ? 'user' : 'assistant',
            content: entry.text,
          });
        }
      }

      messages.push({ role: 'user', content: message });

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!groqResponse.ok) {
        const errorText = await groqResponse.text();
        console.error('Groq API error:', errorText);
        if (groqResponse.status === 429) {
          return new Response(JSON.stringify({ reply: 'I\'m getting a lot of questions right now! Please wait a moment and try again.' }), {
            status: 200,
            headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
          });
        }
        return new Response(JSON.stringify({ error: 'Failed to get response from AI' }), {
          status: 502,
          headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
        });
      }

      const data = await groqResponse.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Worker error:', err);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    }
  },
};
