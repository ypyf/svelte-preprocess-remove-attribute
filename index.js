const svelte = require("svelte/compiler");

module.exports = ({ filter } = {}) => {
  function replace(content, offset, start, end, repl) {
    content =
      content.slice(0, start + offset) + repl + content.slice(end + offset);
    offset += repl.length - (end - start);
    return { content, offset };
  }
  return {
    markup({ content }) {
      const ast = svelte.parse(content);
      if (ast.html) {
        let offset = 0;
        svelte.walk(ast.html, {
          enter(node) {
            if (node.type === "Element") {
              node.attributes.forEach((attr) => {
                if (!filter(attr.name)) {
                  ({ content, offset } = replace(
                    content,
                    offset,
                    attr.start,
                    attr.end,
                    ""
                  ));
                }
              });
            }
          },
        });
      }
      return {
        code: content,
      };
    },
  };
};
