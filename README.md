# DoLLmPurify

DoLLmPurify is an experiment in using Grammar Constrained Decoding to guide an LLM to produce safe, valid and useful HTML for generative UIs.

When generating UIs with an LLM, you may run into the problem of the LLM generating either invalid or unsafe HTML. This is because the LLM has no way of knowing what HTML is valid or safe, and it may not be able to reason about the HTML it generates.

DoLLmPurify solves this problem by generating a GBNF grammar that describes valid and safe HTML for a given UI. The LLM is then constrained by this grammar, which ensures that the HTML it generates is both valid and safe according the rules that are defined.

### Vision

The vision for DoLLmPurify is to create a binary to generate GBNF grammars for any subset of HTML. This grammar should be created from any DomPurify configuration, such that any client side HTML sanitization can be replicated in a server side GBNF grammar.

### Usage

```javascript
import { GenerateGrammar, ParseConfig } from 'dollmpurify';
const html_options = {
  "ALLOWED_TAGS": [
    "a", "b", "i", "em", "strong", "p", "ul", "li", "br",
    "img", "blockquote", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "ol"
  ],
  "ALLOWED_ATTR": ["href", "title", "target", "rel"],
  "ADD_ATTR": ["noopener"],
  "ADD_TAGS": []
}
const options = ParseConfig(html_options);
const grammar = GenerateGrammar(options);
console.log(grammar);
```

## Progress

- [x] Create Generic GBNF grammar for Markdown subset of HTML
- [x] Create extensible way to generate GBNF grammar for any subset of HTML
- [ ] Create library to generate GBNF grammar from DomPurify configuration
