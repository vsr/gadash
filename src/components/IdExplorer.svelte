<script>
  import { loadJs } from "../lib/loader";
  import { onMount, createEventDispatcher } from "svelte";

  let viewSelectorEl;
  let viewSelector;
  let selectedProperty;
  let expanded = true;
  const dispatch = createEventDispatcher();

  onMount(() => {
    loadJs("/lib/view-selector2.js", () => {
      viewSelector = new gapi.analytics.ext.ViewSelector2({
        container: viewSelectorEl
      });
      viewSelector.execute();

      viewSelector.on("viewChange", function(data) {
        selectedProperty = data;
      });
    });
  });

  const selectProperty = () => {
    if (selectedProperty) {
      dispatch("selected", selectedProperty);
    }
  };
</script>

<div class="text-md font-medium">
  Select GA Property
  <button
    class="p-1 rounded bg-gray-900 text-gray-200 w-8 text-xl font-bold"
    on:click={() => {
      expanded = !expanded;
    }}>
    {#if expanded}-{:else}+{/if}
  </button>
</div>
<div class="flex items-end flex-wrap" class:hidden={!expanded}>
  <div bind:this={viewSelectorEl} />
  <button
    on:click={selectProperty}
    class="p-1 h-8 text-sm text-gray-800 bg-gray-300 rounded border
    hover:bg-gray-100">
    Add Property
  </button>
</div>
