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

const renderTranslation = (inputTextValue, translation) => {
  const translatorInput = document.querySelector(".translator__input");
  const translatorLanguage = document.querySelector(".translator__language");
  const languageSelection = document.querySelector(".language-selection");

  translatorInput.textContent = inputTextValue;
  translatorInput.textContent = "Original text 👇";
  translatorLanguage.textContent = "Your translation 👇";
  languageSelection.innerHTML = "";
  languageSelection.innerHTML = `
    <textarea name="prompt" id="input-text">${translation}</textarea>
    <button class="start-over__button">Start Over</button>a
    `;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const inputTextValue = document.getElementById("input-text").value;
  const selectedLanguage = translatorForm.querySelector(
    'input[name="target-language"]:checked'
  );
  if (inputTextValue && selectedLanguage) {
    const translation = await main(inputTextValue, selectedLanguage.value);
    console.log(translation);
    renderTranslation(inputTextValue, translation);
  } else {
    alert("Please enter text and select a language");
  }
};

const handleReset = (e) => {
  if (e.target.classList.contains("start-over__button")) {
    console.log("Clicked!");
  }
};

translatorForm.addEventListener("submit", handleSubmit);
document.addEventListener("click", handleReset);
