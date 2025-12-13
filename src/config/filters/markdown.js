const MarkdownIt = require("markdown-it");

// Create a markdown-it instance with the same options Eleventy uses by default
const md = new MarkdownIt({
    html: true,
    breaks: false,
    linkify: true
});

module.exports = function (content) {
    if (!content) {
        return "";
    }
    return md.render(content);
};

