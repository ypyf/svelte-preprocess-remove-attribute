const preprocessor = require("./index.js");

const content = `
<h1 style="color: red" data-testid="title">Hello</h1>
`;

console.log(
  preprocessor({
    filter: (name) => {
      return name !== "data-testid";
    },
  }).markup({ content }).code
);
