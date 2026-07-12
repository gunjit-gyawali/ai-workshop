import { createFileRoute } from "@tanstack/react-router";
import { NAME, ROLE, LOCATION, EMAIL, SERVICES, HIRE_PACKAGES, EXPERIENCE, SKILLS_FRONTEND, SKILLS_BACKEND } from "@/components/portfolio/data";

type Message = { role: "user" | "assistant"; content: string };

const systemPrompt = () => {
  const services = SERVICES.map((s) => `- ${s.title} (${s.price} ${s.unit}): ${s.desc}`).join("\n");
  const packages = HIRE_PACKAGES.map((p) => `- ${p.name} (${p.price}, ${p.duration}): ${p.description}. Includes: ${p.features.join("; ")}.`).join("\n");
  const experience = EXPERIENCE.map((e) => `- ${e.position} at ${e.company} (${e.duration})`).join("\n");
  const skills = [...SKILLS_FRONTEND, ...SKILLS_BACKEND].map((s) => s.name).join(", ");
  return `You are Gunjit's friendly portfolio assistant. Answer visitor questions about ${NAME}, a ${ROLE} based in ${LOCATION}. Keep responses concise (2-4 sentences), warm and helpful. Encourage users to hire Gunjit or reach out at ${EMAIL} when relevant.

SERVICES & PRICING:
${services}

HIRE PACKAGES:
${packages}

EXPERIENCE:
${experience}

SKILLS: ${skills}

If asked something outside this scope, politely steer back to Gunjit's work, services, or how to get in touch.`;
};

export const Route = createFileRoute("/api/assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages: Message[] };
          if (!Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "messages required" }), { status: 400 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response(JSON.stringify({ error: "AI is not configured" }), { status: 500 });
          }

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [{ role: "system", content: systemPrompt() }, ...messages],
            }),
          });

          if (res.status === 429) {
            return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }), { status: 429 });
          }
          if (res.status === 402) {
            return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402 });
          }
          if (!res.ok) {
            const text = await res.text();
            return new Response(JSON.stringify({ error: "AI error", detail: text }), { status: 500 });
          }
          const data = await res.json();
          const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't answer that.";
          return new Response(JSON.stringify({ reply }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
        }
      },
    },
  },
});
