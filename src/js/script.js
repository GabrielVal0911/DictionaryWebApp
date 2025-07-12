"use strict";

const inputSearch = document.getElementById("wordSearch");
const formSearch = document.getElementById("search-form");
const definitionsContainer = document.getElementById("definitions-container");
const searchErrorMessage = document.getElementById("search__error-message");
const loader = document.getElementById("loader");

async function getWordData(path) {
  try {
    resetHTML();
    showLoader();
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
    searchErrorMessage.classList.remove("hidden");
    hideLoader();
    resetHTML();
  }
}

formSearch.addEventListener("submit", function (e) {
  e.preventDefault();

  getWordData(inputSearch.value);
});

function renderHTML(data) {
  const { word, phonetics, meanings, sourceUrls } = data;

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
          ${displayExamples(definition)}
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
    definitionsContainer.innerHTML = `
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
      <small class="source"
        >Source <a href="${sourceUrls[0]}">${
      sourceUrls[0]
    }<img src="./img/new-tab.png" alt="new tab icon" class="icon-newTab"/></a></small
      >
      `;
  }

  hideLoader();
  searchErrorMessage.classList.add("hidden");
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

function displayExamples(wordData) {
  const { example } = wordData;

  let output = "";

  if (example) {
    output += `<p class="word-example">${example}</p>`;
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

function resetHTML() {
  definitionsContainer.innerHTML = "";
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}
