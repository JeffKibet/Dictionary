// Grab all the elements we need from the page
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const savedList = document.getElementById("savedList");
const darkModeBtn = document.getElementById("darkModeBtn");
const audioPlayer = document.getElementById("audioPlayer");


const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
 
// ===== SEARCH FORM =====
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from refreshing
  const word = searchInput.value.trim();
  if (word !== "") {
    searchWord(word);
  }
});

// ===== FETCH THE WORD FROM THE API =====
async function searchWord(word) {
  resultsDiv.innerHTML = `<p class="hint-text">Searching for "${word}"...</p>`;
 
  try {
    const response = await fetch(API_URL + word);
 
    if (response.status === 404) {
      resultsDiv.innerHTML = `
        <div class="error-box">
          <p>Sorry, we couldn't find "${word}". Check the spelling and try again.</p>
        </div>
      `;
      return;
    }
 
    if (!response.ok) {
      resultsDiv.innerHTML = `
        <div class="error-box">
          <p>Something went wrong. Please try again in a moment.</p>
        </div>
      `;
      return;
    }
 
    const data = await response.json();
    showWord(data[0]);
 
  } catch (error) {
    resultsDiv.innerHTML = `
      <div class="error-box">
        <p>Network error. Please check your internet connection.</p>
      </div>
    `;
  }
}

// ===== SHOW THE WORD ON THE PAGE =====
function showWord(wordData) {
  // Try to find a phonetic spelling and an audio clip
  let phonetic = wordData.phonetic || "";
  let audioSrc = "";
 
  if (wordData.phonetics && wordData.phonetics.length > 0) {
    for (let i = 0; i < wordData.phonetics.length; i++) {
      if (!phonetic && wordData.phonetics[i].text) {
        phonetic = wordData.phonetics[i].text;
      }
      if (!audioSrc && wordData.phonetics[i].audio) {
        audioSrc = wordData.phonetics[i].audio;
      }
    }
  }
} 

// Build the HTML for each meaning (part of speech + definitions)
  let meaningsHTML = "";
 
  wordData.meanings.forEach(function (meaning) {
    let defsHTML = "<ol class='definition-list'>";
 
    // only show the first 3 definitions so the page isn't too long
    const defsToShow = meaning.definitions.slice(0, 3);
 
    defsToShow.forEach(function (def) {
      defsHTML += `<li class="definition-item">${def.definition}`;
      if (def.example) {
        defsHTML += `<p class="example-text">"${def.example}"</p>`;
      }
      defsHTML += `</li>`;
    });
 
    defsHTML += "</ol>";
 
    let synonymsHTML = "";
    if (meaning.synonyms && meaning.synonyms.length > 0) {
      const firstFewSynonyms = meaning.synonyms.slice(0, 5).join(", ");
      synonymsHTML = `<p class="synonym-text"><strong>Synonyms:</strong> ${firstFewSynonyms}</p>`;
    }
 
    meaningsHTML += `
      <p class="part-of-speech">${meaning.partOfSpeech}</p>
      ${defsHTML}
      ${synonymsHTML}
    `;
  });
 
  const alreadySaved = isWordSaved(wordData.word);
 
  // Put it all together into one word card
  resultsDiv.innerHTML = `
    <div class="word-card">
      <h2 class="word-title">
        ${wordData.word}
        ${phonetic ? `<span class="phonetic">${phonetic}</span>` : ""}
      </h2>
      <button class="play-btn" id="playBtn">🔊 Play</button>
      <button class="save-btn ${alreadySaved ? "saved" : ""}" id="saveBtn">
        ${alreadySaved ? "★ Saved" : "☆ Save Word"}
      </button>
      ${meaningsHTML}
    </div>
  `;

  // Hook up the play button
  const playBtn = document.getElementById("playBtn");
  playBtn.addEventListener("click", function () {
    if (audioSrc) {
      audioPlayer.src = audioSrc;
      audioPlayer.play();
    } else {
      alert("No audio available for this word.");
    }
  });
 
  // Hook up the save button
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.addEventListener("click", function () {
    toggleSaveWord(wordData.word);
    saveBtn.classList.toggle("saved");
    saveBtn.textContent = saveBtn.classList.contains("saved") ? "★ Saved" : "☆ Save Word";
  });
}