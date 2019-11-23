<script>
  import { loadJs } from "../lib/loader";
  import { onMount, createEventDispatcher } from "svelte";

  export let expanded = false;
  let viewSelectorEl;
  let viewSelector;
  let selectedProperty;
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

<div class="relative p-2 border m-2 rounded">

  <div
    class="text-md font-medium cursor-pointer"
    on:click={() => {
      expanded = !expanded;
    }}>
    Select GA Property
    <span class="text-gray-600 text-sm">
      {#if expanded}(collapse){:else}(expand){/if}
    </span>
  </div>
  <div class="flex items-end flex-wrap mt-2" class:hidden={!expanded}>
    <div bind:this={viewSelectorEl} />
    <button
      on:click={selectProperty}
      class="text-sm bg-gray-800 rounded border text-gray-100 w-48 h-8 text-md
      my-1 p-1 hover:bg-gray-700">
      Add Property
    </button>
  </div>
</div>
