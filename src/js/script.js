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
  const { word, phonetic, phonetics, meanings, sourceUrls } = data;

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
       
          ${
            definition.synonyms
              ? `<p class="word-synonyms">
        Synonyms <span class="synonyms-examples">${definition.synonyms.map(
          (synonym) => ` ${synonym}`
        )}</span>
      </p>`
              : null
          }
        </li>
      `;
          })
          .join("")}
      </ul>
      `;
    })
    .join("");

  console.log(allMeanings);

  if (data) {
    wordContainer.innerHTML = `
         <h1 class="word">${word}</h1>
      <figure>
        <figcaption class="visually-hidden">
          Listen to the pronunciation
        </figcaption>
        <audio
          id="audio-pronunciations"
          src="https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3"
        ></audio>
        <button class="button-play" id="button-play">
          <i class="fa-solid fa-play play-icon"></i>
        </button>
      </figure>
      <h2 class="word-phonetic">${phonetic}</h2>
      ${allMeanings}
      <p class="word-synonyms">
        Synonyms <span class="synonyms-examples">electronic keyboard</span>
      </p>
      <small
        >Source <a href="${sourceUrls[0]}">${sourceUrls[0]}</a></small
      >
      `;
  }
}

function displaySynonymsAndAntonyms(wordData) {
  //   do this function
}
