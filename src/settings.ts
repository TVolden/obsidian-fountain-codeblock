import { App, PluginSettingTab, Setting } from 'obsidian';
import type FountainCodeblockPlugin from './main';

export interface FountainSettings {
	showTitlePage: boolean;
	showSceneNumbers: boolean;
	showSections: boolean;
	showSynopses: boolean;
	showNotes: boolean;
	pageStyle: boolean;
}

export const DEFAULT_SETTINGS: FountainSettings = {
	showTitlePage: true,
	showSceneNumbers: true,
	showSections: true,
	showSynopses: false,
	showNotes: false,
	pageStyle: true,
};

type BooleanKey = {
	[K in keyof FountainSettings]: FountainSettings[K] extends boolean ? K : never;
}[keyof FountainSettings];

export class FountainSettingTab extends PluginSettingTab {
	plugin: FountainCodeblockPlugin;

	constructor(app: App, plugin: FountainCodeblockPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		this.addToggle('Show title page', 'Render title page fields (title, credit, author, …).', 'showTitlePage');
		this.addToggle('Show scene numbers', 'Display scene numbers such as #1# next to scene headings.', 'showSceneNumbers');
		this.addToggle('Show sections', 'Display # section markers as faint outline headings.', 'showSections');
		this.addToggle('Show synopses', 'Display = synopsis lines.', 'showSynopses');
		this.addToggle('Show notes', 'Display [[notes]] inline.', 'showNotes');
		this.addToggle('Page style', 'Render the screenplay on a paper-like page.', 'pageStyle');
	}

	private addToggle(name: string, desc: string, key: BooleanKey): void {
		new Setting(this.containerEl)
			.setName(name)
			.setDesc(desc)
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings[key]).onChange(async (value) => {
					this.plugin.settings[key] = value;
					await this.plugin.saveSettings();
				}),
			);
	}
}
