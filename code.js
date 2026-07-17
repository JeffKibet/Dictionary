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