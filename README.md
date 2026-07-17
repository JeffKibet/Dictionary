# 📖 Wordly - Dictionary App

Wordly is a **Single Page Application (SPA)** that lets you search for any English word and instantly see its meaning, pronunciation, part of speech, example sentences, and synonyms — all without the page ever reloading.

This project was built as a summative lab for the Moringa School Software Engineering program, focused on JavaScript, the Fetch API, DOM manipulation, and event handling.



## Features

- **Search any word** and get its definition in real time
- **Play pronunciation audio** (when available)
- **Multiple meanings** shown, grouped by part of speech (noun, verb, adjective, etc.)
- **Example sentences** for definitions that have them
- **Synonyms** listed under each meaning
- **Save your favorite words** — they're stored in your browser and stick around after you refresh
- **Dark mode toggle** that also remembers your choice
- **Error handling** for words that don't exist or when the API/network fails

---

## Built With

- **HTML5** — page structure
- **CSS3** — styling, layout, and the dark mode theme
- **Vanilla JavaScript (ES6+)** — no frameworks, no libraries
- **[Free Dictionary API](https://dictionaryapi.dev/)** — the public API that powers the word lookups
- **localStorage** — saves your favorite words and dark mode preference in the browser

---

## Project Structure

```
wordly/
├── index.html      # Page structure (the layout you see)
├── style.css        # All the styling, colors, and dark mode
├── code.js          # App logic — fetching data, rendering results, saving words
└── README.md        # You're reading it!
```

---

##  How to Run It

No installation or build tools needed — it's a plain HTML/CSS/JS project.

1. Clone or download this repository:
   ```
   git clone https://github.com/your-username/wordly.git
   ```
2. Open the project folder.
3. Double-click `index.html`, or right-click it and choose **Open with → your browser**.

That's it! No `npm install`, no server required.


## 🧭 How to Use It

1. Type a word into the search box (e.g. "happy", "ephemeral", "run").
2. Click **Search** (or press Enter).
3. Read the definitions, part of speech, examples, and synonyms.
4. Click **🔊 Play** to hear it pronounced (if audio is available for that word).
5. Click **☆ Save Word** to add it to your saved list — it turns into **★ Saved**.
6. Scroll down to **⭐ Saved Words** and click any saved word to look it up again instantly.
7. Click **🌙 Dark Mode** in the top corner to switch themes.

---

##  API Reference

Wordly uses the free, no-API-key-required **Dictionary API**:

```
GET https://api.dictionaryapi.dev/api/v2/entries/en/<word>
```

Example response includes:
- `word` — the word itself
- `phonetic` / `phonetics` — pronunciation spelling and audio links
- `meanings` — an array of parts of speech, each with definitions, examples, and synonyms

If a word isn't found, the API returns a `404`, which the app catches and shows a friendly error message for instead of crashing.

---

## 🧠 What I Learned Building This

- How to use `fetch()` and `async/await` to talk to a real public API
- How to handle different response outcomes (success, not found, server error, network error) instead of just assuming things work
- How to build HTML dynamically with JavaScript and insert it into the page
- How `localStorage` works for saving data that survives a page refresh
- How to toggle a CSS class with JavaScript to build a dark mode feature

---

## 🔮 Possible Future Improvements

- Add a loading spinner instead of just text while waiting for the API
- Show word history (not just saved words)
- Add keyboard shortcut to focus the search box
- Fetch and display multiple definitions per word from different sources

---

## 👤 Author

Built by Jeff Kibet.