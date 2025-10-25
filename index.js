import OpenAI from "openai";
const token = import.meta.env.VITE_OPENAI_API_KEY;

// const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";
const translatorForm = document.getElementById("translator-form");

async function main(inputTextValue, selectedLanguageValue) {
  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a language expert and can translate anything into ${selectedLanguageValue}. Translate the given text.`,
      },
      {
        role: "user",
        content: `${inputTextValue}`,
      },
    ],
    temperature: 1,
    top_p: 1,
    model: model,
    max_tokens: 150,
  });

  const translation = response.choices[0].message.content;
  console.log(translation);
  return translation;
}

// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });

const handleSubmit = async (e) => {
  e.preventDefault();
  const inputTextValue = document.getElementById("input-text").value;
  const selectedLanguage = translatorForm.querySelector(
    'input[name="target-language"]:checked'
  );
  if (inputTextValue && selectedLanguage) {
    await main(inputTextValue, selectedLanguage.value);
  } else {
    alert("Please enter text and select a language");
  }
};

translatorForm.addEventListener("submit", handleSubmit);
