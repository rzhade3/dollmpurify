# DOLLmPurify

DOLLmPurify is an experiment in using Grammar Constrained Decoding to guide an LLM to produce safe, valid and useful HTML for generative UIs.

When generating UIs with an LLM, you may run into the problem of the LLM generating either invalid or unsafe HTML. This is because the LLM has no way of knowing what HTML is valid or safe, and it may not be able to reason about the HTML it generates.

DOLLmPurify solves this problem by generating a GBNF grammar that describes the valid and safe HTML for a given UI. The LLM is then constrained by this grammar, which ensures that the HTML it generates is both valid and safe according the rules that are defined.

### Vision

The vision for DOLLmPurify is to create a binary to generate GBNF grammars for any subset of HTML. This grammar should be created from any DomPurify configuration, such that any client side HTML sanitization can be replicated in a server side GBNF grammar.

## Progress

- [x] Create Generic GBNF grammar for Markdown subset of HTML
- [ ] Create extensible way to generate GBNF grammar for any subset of HTML
