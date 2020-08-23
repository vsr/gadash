<script>
  import { loadJs } from "../lib/loader";
  import { onMount, createEventDispatcher } from "svelte";

  export let expanded = false;
  let viewSelectorEl;
  let viewSelector;
  let selectedProperty;
  let selectedPeriod;
  const dispatch = createEventDispatcher();

  //   let dateSelectorEl;
  //   let dateSelector;
  //   let date;

  //   const initDateRange = {
  //     "start-date": "7daysAgo",
  //     "end-date": "1daysAgo"
  //   };
  //   const selectDate = () => {
  //     if (date) {
  //       dispatch("selected", date);
  //     }
  //   };

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
    // loadJs("/lib/date-range-selector.js", () => {
    //   dateSelector = new gapi.analytics.ext.DateRangeSelector({
    //     container: dateSelectorEl
    //   })
    //     .set(initDateRange)
    //     .execute();
    //   dateSelector.on("change", data => {
    //     date = data;
    //   });
    //   date = {
    //     "start-date": dateSelector.startDateInput.value,
    //     "end-date": dateSelector.endDateInput.value
    //   };
    //   selectDate();
    // });
  });

  const addDashboard = () => {
    if (selectedPeriod && selectedProperty) {
      dispatch("addDashboard", { selectedProperty, selectedPeriod });
    }
  };
</script>

<section class="relative p-2 bg-white border rounded w-full">

  <a
    href="#/"
    class="text-xs font-medium cursor-pointer w-full"
    on:click={() => {
      expanded = !expanded;
    }}>
    <h1 class="inline">Add custom dashboard block</h1>
    <span class="text-gray-600 text-xs">
      {#if expanded}(collapse){:else}(expand){/if}
    </span>
  </a>

  <div class="flex flex-col mt-2" class:hidden={!expanded}>
    <h2 class="text-xs">Select property</h2>
    <div bind:this={viewSelectorEl} />
    <h2 class="text-xs mt-1">Select time period</h2>
    <select
      name="date-period"
      on:change={ev => (selectedPeriod = ev.target.value)}>
      <option value="live">live</option>
      <option value="today">today</option>
      <option value="yesterday">yesterday</option>
      <option value="this-month">this month</option>
      <option value="last-month">last month</option>
    </select>

    <button
      on:click={addDashboard}
      class="text-xs bg-gray-800 rounded border text-gray-100 h-6 my-1 p-1
      hover:bg-gray-700">
      Add Dashboard
    </button>
  </div>

  <!--
  <div
    class="text-xs font-medium cursor-pointer"
    on:click={() => {
      expanded = !expanded;
    }}>
    Select GA Property
    <span class="text-gray-600 text-xs">
      {#if expanded}(collapse){:else}(expand){/if}
    </span>
  </div>
  <div class="flex items-end flex-wrap mt-2" class:hidden={!expanded}>
    <div bind:this={viewSelectorEl} />
    <button
      on:click={selectProperty}
      class="text-xs bg-gray-800 rounded border text-gray-100 h-6 my-1 p-1
      hover:bg-gray-700">
      Add Property
    </button>
  </div>

  <div class="relative p-1 border m-1 rounded">

    <div
      class="text-xs font-medium cursor-pointer"
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
        class="bg-gray-800 rounded border text-gray-100 h-6 text-xs my-1 p-1
        hover:bg-gray-700">
        Select Date
      </button>
    </div>
  </div> -->

</section>
