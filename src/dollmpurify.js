import { DefaultAllowedAttributes, DefaultAllowedTags, SelfClosingTags } from './tags.js';
import ejs from 'ejs/ejs.min.js';

export const HTML_GRAMMAR_TEMPLATE = `root ::= html

html ::= "<html>" head body "</html>"
head ::= "<head>" (headElement | text)* "</head>"
body ::= "<body>" (bodyElement | text)* "</body>"

headElement ::= title | meta | link
title ::= "<title>" text* "</title>"
meta ::= "<meta" attributes "/>"
link ::= "<link" attributes "/>"

bodyElement ::= <%= allowedTags.join(" | ") %>

text ::= [^<>]+

<% selfClosingTags.forEach(tag => { %>
<%= tag %> ::= "<<%= tag %>" attributes? "/>"
<% }) %>

<% nonSelfClosingTags.forEach(tag => { %>
<%= tag %> ::= "<<%= tag %>" attributes? ">" (bodyElement | text)* "</<%= tag %>>"
<% }) %>

attributes ::= (ws attribute)* ws
attribute ::= attributeName "=" attributeValue
attributeName ::= <%- allowedAttributes.map(a => '"' + a + '"').join(" | ") %>
attributeValue ::= "\\"" [^"]* "\\""

ws ::= [ \\t\\n\\r]*`

export function GenerateGrammar(config) {
    return ejs.render(HTML_GRAMMAR_TEMPLATE, config, {});
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
