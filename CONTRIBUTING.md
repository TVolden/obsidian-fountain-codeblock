# Contributing

## Development

```bash
npm install
npm run dev     # rebuilds main.js on every change
npm run build   # type-check and production build
npm run lint
```

To test in a vault, link the repo into the vault's plugin folder (Windows example):

```powershell
New-Item -ItemType Junction -Path "<vault>\.obsidian\plugins\fountain-codeblock" -Target "<path to this repo>"
```

Then enable the plugin and reload it after each rebuild (or use the [Hot-Reload](https://github.com/pjeby/hot-reload) plugin).

Source layout:

- `src/main.ts`: plugin entry, registers the `fountain` code block processor
- `src/render.ts`: turns fountain-js tokens into DOM
- `src/settings.ts`: settings and settings tab
- `styles.css`: screenplay layout

## Releasing

1. Bump the version: `npm version patch|minor|major`. This updates `package.json`, `manifest.json` and `versions.json`. Tags have no `v` prefix.
2. Push the commit and tag: `git push --follow-tags`.
3. The *Release Obsidian plugin* workflow builds and creates a **draft** GitHub release with `main.js`, `manifest.json` and `styles.css`. Publish that draft. Don't create a separate release by hand, or it won't have the files attached.

## Submitting to the community plugin list

After a release is published, open a pull request to [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases) that appends this entry to `community-plugins.json`:

```json
{
	"id": "fountain-codeblock",
	"name": "Fountain Codeblock",
	"author": "Thomas Volden",
	"description": "Render Fountain screenplay markup in fountain code blocks.",
	"repo": "TVolden/obsidian-fountain-codeblock"
}
```
