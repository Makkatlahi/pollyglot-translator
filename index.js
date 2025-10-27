// import OpenAI from "openai";
// const token = import.meta.env.VITE_OPENAI_API_KEY;

// const token = process.env["GITHUB_TOKEN"];
// const endpoint = "https://models.github.ai/inference";
// const model = "openai/gpt-4.1";
const translatorForm = document.getElementById("translator-form");

async function main(inputTextValue, selectedLanguageValue) {
  try {
    const response = await fetch("./netlify/functions/translate.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputTextValue,
        language: selectedLanguageValue,
      }),
    });
    const data = await response.json();
    const translation = data.choices[0].message.content;
    console.log(translation);
    return translation;
  } catch (error) {
    console.error("Translation error: ", error);
    throw error;
  }
}

// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });

const renderTranslation = (inputTextValue, translation) => {
  const translatorSection = document.querySelector(".translator");
  translatorSection.innerHTML = "";
  const translationDiv = document.createElement("div");
  translationDiv.classList.add("translation");
  translationDiv.innerHTML = `
    <label for="input-text" class="translator__input"
            >Original text 👇</label
          >
          <textarea name="prompt" id="input-text">${inputTextValue}</textarea>
          <label for="language-selection" class="translator__language"
            >Your translation 👇</label
          >
    <textarea name="prompt" id="input-text">${translation}</textarea>
    <button class="start-over__button">Start Over</button>
    `;
  translatorSection.appendChild(translationDiv);
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
    alert("Please enter text and select a language"); // change to dom manipulation...
  }
};

const handleReset = (e) => {
  if (e.target.classList.contains("start-over__button")) {
    window.location.href = "./index.html";
  }
};

translatorForm.addEventListener("submit", handleSubmit);
document.addEventListener("click", handleReset);
