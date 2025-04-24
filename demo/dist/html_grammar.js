root ::= html

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
attributeName ::= <%- allowedAttributes.map(a => `"${a}"`).join(" | ") %>
attributeValue ::= "\"" [^"]* "\""

ws ::= [ \t\n\r]*
