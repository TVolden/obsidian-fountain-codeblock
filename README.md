# Fountain Codeblock

An [Obsidian](https://obsidian.md) plugin that renders [Fountain](https://fountain.io/syntax/) screenplay markup inside `fountain` code blocks, in both Reading view and Live Preview.

````markdown
```fountain
Title: Brick & Steel
Credit: Written by
Author: Stu Maschwitz

EXT. BRICK'S PATIO - DAY #1#

A gorgeous day. The sun is *shining*.

BRICK
(quietly)
Nice day for it.

STEEL ^
Sure is.

CUT TO:
```
````

## Supported syntax

Everything `fountain-js` parses: title page, scene headings (incl. forced `.` and scene numbers `#1#`), action, characters, parentheticals, dialogue, dual dialogue (`^`), transitions, centered text (`> text <`), lyrics (`~`), page breaks (`===`), sections (`#`), synopses (`=`), notes (`[[ ]]`), boneyard (`/* */`) and emphasis (`*italic*`, `**bold**`, `_underline_`).

## Settings

| Setting | Default | Description |
|---|---|---|
| Show title page | on | Render title page fields |
| Show scene numbers | on | Show `#1#` scene numbers |
| Show sections | on | Show `#` sections as faint outline headings |
| Show synopses | off | Show `=` synopsis lines |
| Show notes | off | Show `[[notes]]` |
| Page style | on | Render on a paper-like page |

## Installation

### Manual
1. Download `main.js`, `manifest.json` and `styles.css` from the [latest release](https://github.com/TVolden/obsidian-fountain-codeblock/releases/latest).
2. Copy them to `<vault>/.obsidian/plugins/fountain-codeblock/`.
3. Enable **Fountain Codeblock** under *Settings → Community plugins*.

### From source
```bash
npm install
npm run build   # or: npm run dev (watch mode)
```

## Releasing

1. Bump the version: `npm version patch|minor|major` (updates `package.json`, `manifest.json` and `versions.json`; tags have no `v` prefix).
2. Push the commit and tag: `git push --follow-tags`.
3. The *Release Obsidian plugin* workflow builds and creates a **draft** GitHub release with `main.js`, `manifest.json` and `styles.css`. Review it and publish.

### Submitting to the community plugin list

After the first release is published, open a pull request to [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases) that appends this entry to `community-plugins.json`:

```json
{
	"id": "fountain-codeblock",
	"name": "Fountain Codeblock",
	"author": "Thomas Volden",
	"description": "Render Fountain screenplay markup in fountain code blocks.",
	"repo": "TVolden/obsidian-fountain-codeblock"
}
```

## Credits

- Parsing: [fountain-js](https://github.com/jonnygreenwald/fountain-js) by Jonny Greenwald and contributors (MIT).
- Project scaffold: [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin) (0BSD).
- [Fountain](https://fountain.io) syntax by Stu Maschwitz, John August and contributors.

## License

[MIT](LICENSE)
