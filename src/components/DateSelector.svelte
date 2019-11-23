<script>
  import { loadJs } from "../lib/loader";
  import { onMount, createEventDispatcher } from "svelte";

  export let expanded = false;
  let dateSelectorEl;
  let dateSelector;
  let date;
  const dispatch = createEventDispatcher();

  const initDateRange = {
    "start-date": "7daysAgo",
    "end-date": "1daysAgo"
  };
  const selectDate = () => {
    if (date) {
      dispatch("selected", date);
    }
  };
  onMount(() => {
    loadJs("/lib/date-range-selector.js", () => {
      dateSelector = new gapi.analytics.ext.DateRangeSelector({
        container: dateSelectorEl
      })
        .set(initDateRange)
        .execute();
      dateSelector.on("change", data => {
        date = data;
      });
      date = {
        "start-date": dateSelector.startDateInput.value,
        "end-date": dateSelector.endDateInput.value
      };
      selectDate();
    });
  });
</script>

<div class="relative p-2 border m-2 rounded">

  <div
    class="text-sm font-medium cursor-pointer"
    on:click={() => {
      expanded = !expanded;
    }}>
    Select Date Range
    <span class="text-gray-600 text-xs">
      {#if expanded}(collapse){:else}(expand){/if}
    </span>
  </div>
  <div class="flex items-end flex-wrap mt-2" class:hidden={!expanded}>
    <div bind:this={dateSelectorEl} />
    <button
      on:click={selectDate}
      class="bg-gray-800 rounded border text-gray-100 w-48 h-8 text-sm my-1 p-1
      hover:bg-gray-700">
      Select Date
    </button>
  </div>
</div>
