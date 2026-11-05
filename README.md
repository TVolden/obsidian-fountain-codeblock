# Fountain Codeblock

Write screenplay scenes right inside your Obsidian notes and see them formatted like a real script.

Fountain Codeblock turns any `fountain` code block into a properly laid out screenplay page, with scene headings, centered character names, indented dialogue and right-aligned transitions. It works in both Reading view and Live Preview, on desktop and mobile.

It's useful when you want to:

- sketch a scene in the middle of your story notes
- keep dialogue snippets next to character profiles or research
- share a formatted excerpt without leaving your vault

## Quick start

Type three backticks followed by `fountain`, write your scene, and close the block:

````markdown
```fountain
INT. LIGHTHOUSE - NIGHT

Rain hammers the windows. MARA (40s) climbs the spiral stairs, lantern in hand.

MARA
(out of breath)
Every single step. Every single night.

JONAS (O.S.)
You could always take the elevator.

MARA
We don't *have* an elevator.

CUT TO:
```
````

Switch to Live Preview or Reading view, and the block is rendered as a screenplay page. Click into the block (or use Source mode) to edit the text again.

## Fountain cheat sheet

[Fountain](https://fountain.io/syntax/) is plain text that looks like a screenplay, so most of it formats itself. The essentials:

| What you want | What you type |
|---|---|
| Scene heading | A line starting with `INT.`, `EXT.`, `EST.` or `INT./EXT.`, e.g. `EXT. BEACH - DAY` |
| Force a scene heading | Start the line with a period: `.FLASHBACK` |
| Scene number | Add it at the end: `INT. HOUSE - DAY #12#` |
| Action | Any ordinary paragraph |
| Character | A line in ALL CAPS, followed by dialogue on the next line |
| Force a character name | Start the line with `@`: `@McCLANE` |
| Parenthetical | A line in `(parentheses)` under the character name |
| Dual dialogue | Add `^` after the second character name: `JONAS ^` |
| Transition | An uppercase line ending in `TO:`, or start a line with `>` |
| Centered text | Wrap it in `> … <`: `> THE END <` |
| Lyrics | Start the line with `~` |
| Emphasis | `*italic*`, `**bold**`, `***bold italic***`, `_underline_` |
| Page break | A line with `===` |
| Title page | `Title:`, `Credit:`, `Author:`, `Draft date:`, `Contact:` … at the very top of the block, followed by a blank line |
| Section (outline) | Start the line with `#`, `##`, `###` |
| Synopsis (outline) | Start the line with `=` |
| Note to self | `[[like this]]`, inline or on its own line |
| Hide text completely | Wrap it in `/* … */` |

See the [full Fountain syntax](https://fountain.io/syntax/) for every detail.

## Settings

Open **Settings → Fountain Codeblock** to choose what gets shown. Changes apply right away to notes that are already open.

| Setting | Default | What it does |
|---|---|---|
| Show title page | On | Shows the title, credit, author and contact block at the top |
| Show scene numbers | On | Shows scene numbers like `#12#` on both sides of the scene heading |
| Show sections | On | Shows `#` sections as faint outline headings |
| Show synopses | Off | Shows `=` synopsis lines in muted italics |
| Show notes | Off | Shows `[[notes]]` as highlighted text instead of hiding them |
| Page style | On | Puts the screenplay on a paper-like page. Turn it off to blend into your note |

## Installation

Fountain Codeblock is not in Obsidian's community plugin directory yet. You can install it with BRAT or by hand.

### With BRAT (recommended, updates automatically)

1. In Obsidian, install and enable the **BRAT** plugin from *Settings → Community plugins → Browse*.
2. Open the command palette and run **BRAT: Add a beta plugin for testing**.
3. Enter `TVolden/obsidian-fountain-codeblock` and confirm.
4. Enable **Fountain Codeblock** under *Settings → Community plugins*.

### By hand

1. Download `main.js`, `manifest.json` and `styles.css` from the [latest release](https://github.com/TVolden/obsidian-fountain-codeblock/releases/latest).
2. In your vault, create the folder `.obsidian/plugins/fountain-codeblock/` and put the three files in it.
3. Restart Obsidian, or reload the plugin list under *Settings → Community plugins*.
4. Enable **Fountain Codeblock**.

To update, download the new files and replace the old ones.

## Tips and troubleshooting

- **Nothing is rendered.** Make sure the block starts with exactly ```` ```fountain ```` and that the plugin is enabled. In Source mode, Obsidian always shows the raw text.
- **A line shows up as action instead of a character.** Character names need to be in ALL CAPS, with dialogue on the very next line and an empty line before. Use `@` to force it.
- **The title page doesn't appear.** Title page fields must be the first lines of the block, with a blank line between them and the script.
- **Can I use this with other Fountain plugins?** Yes. This plugin only handles `fountain` code blocks inside Markdown notes, so it doesn't interfere with plugins that open whole `.fountain` files.
- **Fonts.** The screenplay uses Courier Prime if it's installed and falls back to Courier New or Courier otherwise.

## Feedback

Found a bug or have an idea? Please [open an issue](https://github.com/TVolden/obsidian-fountain-codeblock/issues). Pasting the Fountain text that causes the problem helps a lot.

Want to build the plugin yourself or contribute? See [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits

- Screenplay parsing by [fountain-js](https://github.com/jonnygreenwald/fountain-js), by Jonny Greenwald and contributors (MIT).
- The [Fountain](https://fountain.io) format, by Stu Maschwitz, John August and contributors.
- Built from the [Obsidian sample plugin](https://github.com/obsidianmd/obsidian-sample-plugin) template.

## License

[MIT](LICENSE)
