export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
  try {
    const { text, language } = JSON.parse(event.body);
    const response = await fetch(
      "https://models.github.ai/inference/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4.1",
          messages: [
            {
              role: "system",
              content: `You are a language expert and can translate anything into ${language}. Translate the given text.`,
            },
            {
              role: "user",
              content: text,
            },
          ],
          temperature: 1,
          top_p: 1,
          max_tokens: 150,
        }),
      }
    );
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
}
