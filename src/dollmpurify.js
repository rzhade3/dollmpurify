import { DefaultAllowedAttributes, DefaultAllowedTags, SelfClosingTags } from './tags.js';

export function RenderGrammar(grammar_template, config) {
    return ejs.render(grammar_template, config, {});
}

export function ParseConfig(config) {
	const allowedTags = config.ALLOWED_TAGS || DefaultAllowedTags;
	const allowedAttributes = config.ALLOWED_ATTR || DefaultAllowedAttributes;
	const extraAllowedTags = config.ADD_TAGS || [];
	const extraAllowedAttributes = config.ADD_ATTR || [];

	const allAllowedTags = [...allowedTags, ...extraAllowedTags];
	const allAllowedAttributes = [...allowedAttributes, ...extraAllowedAttributes];

	const selfClosingTags = allAllowedTags.filter(tag => SelfClosingTags.includes(tag));
	const nonSelfClosingTags = allAllowedTags.filter(tag => !SelfClosingTags.includes(tag));

	return {
		allowedTags: allAllowedTags,
		allowedAttributes: allAllowedAttributes,
		selfClosingTags,
		nonSelfClosingTags,
	};
}


