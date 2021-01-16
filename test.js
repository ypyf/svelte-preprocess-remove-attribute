const preprocessor = require("./index.js");

const content = `
<script lang="ts">
  import { getComponentContext } from '@component-util/routine';

  export let tableId: string;
  export let ref: HTMLDivElement | null = null;

  const { manager } = getComponentContext(tableId);
  const { rowGhost } = manager;

  $: index = $rowGhost.index;
  $: columnText = $rowGhost.columnText;
  );
</script>

<div class="drag-handle" data-test="dragHandle">{index + 1}</div>
{#each columnText as text, i}
  <div class="cell" style="{cellStyles[i]}">{text}</div>
{/each}
`;

console.log(
  preprocessor({
    filter: (name) => {
      return name !== "data-test";
    },
  }).markup({ content }).code
);
