<script>
  import { loadJs } from "../lib/loader";
  import { onMount, createEventDispatcher } from "svelte";

  let dateSelectorEl;
  let dateSelector;
  let date;
  let expanded = true;
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

<div class="text-md font-medium">
  Select Date Range
  <button
    class="p-1 rounded bg-gray-900 text-gray-200 w-8 text-xl font-bold"
    on:click={() => {
      expanded = !expanded;
    }}>
    {#if expanded}-{:else}+{/if}
  </button>
</div>
<div class="flex items-end flex-wrap" class:hidden={!expanded}>
  <div bind:this={dateSelectorEl} />
  <button
    on:click={selectDate}
    class="p-1 h-8 text-sm text-gray-800 bg-gray-300 rounded border
    hover:bg-gray-100">
    Select Date
  </button>
</div>
