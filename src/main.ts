import { MarkdownView, Plugin } from 'obsidian';
import { renderFountain } from './render';
import { DEFAULT_SETTINGS, FountainSettings, FountainSettingTab } from './settings';

export default class FountainCodeblockPlugin extends Plugin {
	settings: FountainSettings = { ...DEFAULT_SETTINGS };

	async onload(): Promise<void> {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor('fountain', (source, el) => {
			renderFountain(source, el, this.settings);
		});

		this.addSettingTab(new FountainSettingTab(this.app, this));
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, (await this.loadData()) as Partial<FountainSettings> | null);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
		this.rerenderOpenNotes();
	}

	/** Re-render open notes so setting changes apply immediately. */
	private rerenderOpenNotes(): void {
		this.app.workspace.getLeavesOfType('markdown').forEach((leaf) => {
			if (leaf.view instanceof MarkdownView) {
				leaf.view.previewMode.rerender(true);
			}
		});
		// Live Preview widgets re-render when editor options change.
		this.app.workspace.updateOptions();
	}
}
