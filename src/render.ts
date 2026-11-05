import { Fountain, InlineLexer, Token } from 'fountain-js';
import { sanitizeHTMLToDom } from 'obsidian';
import type { FountainSettings } from './settings';

/** Title page fields grouped by where they appear on a printed title page. */
const TITLE_CENTER = ['title', 'credit', 'author', 'authors', 'source'];

/**
 * Converts inline Fountain markup (emphasis, line breaks, inline notes) to DOM.
 * fountain-js HTML-escapes the text before adding its own markup, and the
 * result is passed through Obsidian's sanitizer before reaching the DOM.
 */
function appendInline(el: HTMLElement, text: string | undefined, settings: FountainSettings, keepIndent = false): void {
	if (!text) return;
	let html = InlineLexer.reconstruct(text, keepIndent);
	html = html.replace(/<!-- ([\s\S]*?) -->/g, (_match, note: string) =>
		settings.showNotes ? `<span class="fountain-note">[[${note}]]</span>` : '',
	);
	el.append(sanitizeHTMLToDom(html));
}

function renderTitlePage(tokens: Token[], root: HTMLElement, settings: FountainSettings): void {
	if (tokens.length === 0) return;
	const page = root.createDiv({ cls: 'fountain-title-page' });
	const center = page.createDiv({ cls: 'fountain-title-center' });
	const left = page.createDiv({ cls: 'fountain-title-left' });
	const right = page.createDiv({ cls: 'fountain-title-right' });

	for (const token of tokens) {
		const cls = `fountain-${token.type.replace(/_/g, '-')}`;
		if (token.type === 'title') {
			appendInline(center.createEl('h1', { cls }), token.text, settings);
		} else if (TITLE_CENTER.includes(token.type)) {
			appendInline(center.createEl('p', { cls }), token.text, settings);
		} else if (token.type === 'contact' || token.type === 'copyright') {
			appendInline(left.createEl('p', { cls }), token.text, settings);
		} else {
			appendInline(right.createEl('p', { cls }), token.text, settings);
		}
	}
}

function renderScript(tokens: Token[], root: HTMLElement, settings: FountainSettings): void {
	// Stack of containers so dialogue blocks nest inside dual-dialogue wrappers.
	const stack: HTMLElement[] = [root];
	const current = (): HTMLElement => stack[stack.length - 1] ?? root;

	for (const token of tokens) {
		const parent = current();
		switch (token.type) {
			case 'scene_heading': {
				const heading = parent.createEl('h3', { cls: 'fountain-scene-heading' });
				if (settings.showSceneNumbers && token.scene_number) {
					heading.createSpan({ cls: 'fountain-scene-number fountain-scene-number-left', text: token.scene_number });
				}
				appendInline(heading.createSpan({ cls: 'fountain-scene-text' }), token.text, settings);
				if (settings.showSceneNumbers && token.scene_number) {
					heading.createSpan({ cls: 'fountain-scene-number fountain-scene-number-right', text: token.scene_number });
				}
				break;
			}
			case 'action':
				appendInline(parent.createEl('p', { cls: 'fountain-action' }), token.text, settings, true);
				break;
			case 'centered':
				appendInline(parent.createEl('p', { cls: 'fountain-centered' }), token.text, settings);
				break;
			case 'transition':
				appendInline(parent.createEl('p', { cls: 'fountain-transition' }), token.text, settings);
				break;
			case 'lyrics':
				appendInline(parent.createEl('p', { cls: 'fountain-lyrics' }), token.text, settings);
				break;
			case 'page_break':
				parent.createEl('hr', { cls: 'fountain-page-break' });
				break;
			case 'dual_dialogue_begin':
				stack.push(parent.createDiv({ cls: 'fountain-dual-dialogue' }));
				break;
			case 'dialogue_begin': {
				const cls = ['fountain-dialogue'];
				if (token.dual) cls.push(`fountain-dialogue-${token.dual}`);
				stack.push(parent.createDiv({ cls }));
				break;
			}
			case 'dialogue_end':
			case 'dual_dialogue_end':
				if (stack.length > 1) stack.pop();
				break;
			case 'character':
				appendInline(parent.createEl('p', { cls: 'fountain-character' }), token.text, settings);
				break;
			case 'parenthetical':
				appendInline(parent.createEl('p', { cls: 'fountain-parenthetical' }), token.text, settings);
				break;
			case 'dialogue':
				appendInline(parent.createEl('p', { cls: 'fountain-dialogue-text' }), token.text, settings);
				break;
			case 'section':
				if (settings.showSections) {
					const depth = Math.min(Math.max(token.depth ?? 1, 1), 6);
					appendInline(
						parent.createDiv({ cls: `fountain-section fountain-section-${depth}` }),
						token.text,
						settings,
					);
				}
				break;
			case 'synopsis':
				if (settings.showSynopses) {
					appendInline(parent.createEl('p', { cls: 'fountain-synopsis' }), token.text, settings);
				}
				break;
			case 'note':
				if (settings.showNotes) {
					parent.createEl('p', { cls: 'fountain-note', text: `[[${token.text ?? ''}]]` });
				}
				break;
			default:
				// spaces, boneyard and unknown tokens produce no output
				break;
		}
	}
}

/** Renders Fountain source into `el`. Falls back to the raw source on parse errors. */
export function renderFountain(source: string, el: HTMLElement, settings: FountainSettings): void {
	const root = el.createDiv({ cls: 'fountain-block' });
	if (settings.pageStyle) root.addClass('fountain-page');

	let tokens: Token[];
	try {
		tokens = new Fountain().parse(source, true).tokens;
	} catch (error) {
		root.addClass('fountain-error');
		root.createEl('p', {
			cls: 'fountain-error-message',
			text: `Could not parse Fountain: ${error instanceof Error ? error.message.split('\n')[0] : String(error)}`,
		});
		root.createEl('pre', { text: source });
		return;
	}

	if (tokens.length === 0) {
		root.createEl('p', { cls: 'fountain-empty', text: 'Nothing to render.' });
		return;
	}

	const titleTokens = tokens.filter((t) => t.is_title);
	const scriptTokens = tokens.filter((t) => !t.is_title);

	if (settings.showTitlePage) renderTitlePage(titleTokens, root, settings);
	renderScript(scriptTokens, root.createDiv({ cls: 'fountain-script' }), settings);
}
