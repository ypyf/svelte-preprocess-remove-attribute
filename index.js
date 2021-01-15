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
      let scriptBlock, scriptMark, styleBlock, styleMark;

      content = content
        .replace(/<script[\s\S]*<\/script>/, (s) => {
          scriptBlock = s;
          scriptMark = `<!--${Math.random()}${Math.random()}${Math.random()}${Math.random()}-->`;
          return scriptMark;
        })
        .replace(/<style[\s\S]*<\/style>/, (s) => {
          styleBlock = s;
          styleMark = `<!--${Math.random()}${Math.random()}${Math.random()}${Math.random()}-->`;
          return styleMark;
        });

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

        if (scriptBlock) {
          content = content.replace(scriptMark, scriptBlock);
        }

        if (styleBlock) {
          content = content.replace(styleMark, styleBlock);
        }
      }

      return {
        code: content,
      };
    },
  };
};
