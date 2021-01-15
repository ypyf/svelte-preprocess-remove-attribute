const svelte = require("svelte/compiler");

module.exports = ({ filter } = {}) => {
  return {
    markup({ content }) {
      const ast = svelte.parse(content);
      if (ast.html) {
        svelte.walk(ast.html, {
          enter(node) {
            if (node.type === "Element") {
              node.attributes = node.attributes.filter((attr) =>
                filter(attr.name)
              );
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
