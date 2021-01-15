const preprocessor = require("./index.js");

const content = `
<script lang="ts">
  import { getComponentContext } from '@component-util/routine';

  export let tableId: string;
  export let ref: HTMLDivElement | null = null;

  const { manager } = getComponentContext(tableId);
  const { rowGhost } = manager;

  $: index = $rowGhost.index;
  $: height = $rowGhost.height;
  $: columnText = $rowGhost.columnText;
  $: columnWidths = $rowGhost.columnWidths;
  );
</script>

<div class="row row-ghost" style="{ghostStyle}" bind:this="{ref}">
  <div class="drag-handle" data-testid="dragHandle">{index + 1}</div>
  {#each columnText as text, i}
    <div class="cell" style="{cellStyles[i]}">{text}</div>
  {/each}
</div>

`;

console.log(
  preprocessor({
    filter: (name) => {
      return name !== "data-testid";
    },
  }).markup({ content }).code
);
