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

const PROVIDERS = [
  {
    name: 'openrouter',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'google/gemma-3-27b-it:free',
    keyName: 'OPENROUTER_API_KEY',
  },
];

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
    if (cachedKnowledge) return cachedKnowledge;
    throw new Error(`Failed to fetch knowledge base: ${response.status}`);
  }

  cachedKnowledge = await response.json();
  cacheTime = now;
  return cachedKnowledge;
}

function truncate(text, maxLen) {
  if (!text || text.length <= maxLen) return text;
  return text.substring(0, maxLen) + '...';
}

function buildSystemPrompt(knowledge) {
  const siteUrl = knowledge.siteUrl;

  // Shorter publication lines: number + title + venue only (drop authors to save tokens)
  const pubLines = knowledge.publications.map(
    (p) => `${p.number} "${p.title}" — ${p.venue}`
  );

  return `${INSTRUCTIONS}

Website: ${siteUrl}
Last updated: ${knowledge.lastUpdated}

### About / Home (${siteUrl})
${truncate(knowledge.pages.home, 3000)}

### Current Team (${siteUrl}/people)
${knowledge.pages.people}

### Alumni (${siteUrl}/alumni)
${truncate(knowledge.pages.alumni, 3000)}

### Teaching (${siteUrl}/teaching/)
${knowledge.pages.teaching}

### Scientific Software (${siteUrl}/software/)
${knowledge.pages.software}

### Research Projects (${siteUrl}/projects)
${knowledge.pages.projects}

### Simulation Gallery (${siteUrl}/cool/)
${truncate(knowledge.pages.simulations, 1000)}

## All ${knowledge.publications.length} Publications — full list: ${siteUrl}/publications/
${pubLines.join('\n')}
`;
}

async function callProvider(provider, messages, env) {
  const apiKey = env[provider.keyName];
  if (!apiKey) return null;

  const response = await fetch(provider.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: provider.model,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (response.status === 429) {
    // Rate limited — wait and retry once
    await new Promise((r) => setTimeout(r, 3000));
    const retry = await fetch(provider.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: provider.model,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });
    if (!retry.ok) {
      const errText = await retry.text();
      console.error(`${provider.name} retry error (${retry.status}):`, errText);
      return null;
    }
    const retryData = await retry.json();
    return retryData.choices?.[0]?.message?.content || null;
  }

  if (!response.ok) {
    const errText = await response.text();
    console.error(`${provider.name} error (${response.status}):`, errText);
    return null;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
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

      const knowledge = await getKnowledge();
      const systemPrompt = buildSystemPrompt(knowledge);

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

      // Try providers in order
      let reply = null;
      for (const provider of PROVIDERS) {
        reply = await callProvider(provider, messages, env);
        if (reply) break;
      }

      if (!reply) {
        return new Response(JSON.stringify({ reply: 'I\'m getting a lot of questions right now! Please wait a moment and try again.' }), {
          status: 200,
          headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
        });
      }

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
