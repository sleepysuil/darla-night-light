# Your Night Light

A comfort website for Darlala, made by Luis.

## Files

```
darlala-night-light/
├── index.html      the page
├── css/
│   └── style.css   colors, fonts and layout
├── js/
│   └── script.js   letters, songs, reminders and everything interactive
└── README.md
```

## Editing the words

All the text lives at the top of `js/script.js` inside `const DEFAULTS = { ... }`:

- `herName`, `yourName`, `intro`
- `letters` — one letter per feeling (title and body; use `\n\n` for a new paragraph)
- `moodSongs` — the song for each feeling
- `reasons`, `jokes`, `motivation`, `tasks` — one item per line in each list

## Hosting on GitHub Pages

1. Create a new public repository on GitHub.
2. Upload `index.html`, the `css` folder and the `js` folder to it.
3. Go to Settings → Pages, set Source to "Deploy from a branch", pick `main` and `/ (root)`, then Save.
4. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.
