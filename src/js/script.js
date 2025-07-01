"use strict";

const inputSearch = document.getElementById("wordSearch");
const formSearch = document.getElementById("search-form");
const wordContainer = document.getElementById("word-container");

async function getWordData(path) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${path}`
    );
    if (response.ok) {
      const data = await response.json();

      renderHTML(data[0]);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

formSearch.addEventListener("submit", function (e) {
  e.preventDefault();

  getWordData(inputSearch.value);
});

function renderHTML(data) {
  const { word, phonetics, meanings, sourceUrls } = data;
  console.log(data);

  //   console.log(word);
  //   console.log(phonetic);
  //   console.log(phonetics);
  //   console.log(meanings);
  //   console.log(sourceUrls);

  const allMeanings = meanings
    .map((meaning) => {
      return `<span class="word-part-of-speech">${meaning.partOfSpeech}</span>
      <h3 class="word-meaning">Meaning</h3>
      <ul class="word-meaning-list">
        ${meaning.definitions
          .map((definition) => {
            return `
      <li class="word-meaning-definition">
          ${definition.definition}
          ${displaySynonymsAndAntonyms(definition)}
         
        </li>
      `;
          })
          .join("")}
      </ul>
      ${displaySynonymsAndAntonyms(meaning)}
      `;
    })
    .join("");

  if (data) {
    wordContainer.innerHTML = `
         <h1 class="word">${word}</h1>
      <figure>
        <figcaption class="visually-hidden">
          Listen to the pronunciation
        </figcaption>
        <audio
          id="audio-pronunciations"
          src="${getAudioPhonetics(phonetics)}"
        ></audio>
        <button class="button-play" id="button-play">
          <i class="fa-solid fa-play play-icon"></i>
        </button>
      </figure>
      <h2 class="word-phonetic">${getPhoneticText(phonetics).text || ""}</h2>
      ${allMeanings}
      <small
        >Source <a href="${sourceUrls[0]}">${sourceUrls[0]}</a></small
      >
      `;
  }

  playAudio();
}

function displaySynonymsAndAntonyms(wordData) {
  const { synonyms = [], antonyms = [] } = wordData;

  let output = "";

  if (synonyms.length > 0) {
    output += `<p class="word-synonyms">
         Synonyms <span class="synonyms-examples">${synonyms.join(", ")}</span>
       </p>`;
  } else if (antonyms.length > 0) {
    output += `<p class="word-antonyms">
         Antonyms <span class="antonyms-examples">${antonyms.join(", ")}</span>
       </p>`;
  }

  return output;
}

function getAudioPhonetics(phonetics) {
  if (!Array.isArray(phonetics)) return "";
  const audioSrc = phonetics.find((phonetic) => phonetic.audio);
  return audioSrc ? audioSrc.audio : "";
}

function getPhoneticText(phonetics) {
  if (!Array.isArray(phonetics)) return "";
  return phonetics.find((phonetic) => phonetic.text) || "";
}

function playAudio() {
  const audio = document.getElementById("audio-pronunciations");
  const btnPlay = document.getElementById("button-play");

  btnPlay.addEventListener("click", function () {
    audio.play();
  });
}
