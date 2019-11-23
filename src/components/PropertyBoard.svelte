<script>
  export let viewData;
  export let dateRange;
  import { onMount, createEventDispatcher } from "svelte";

  let chartContainers = [];
  let expanded = true;
  const dispatch = createEventDispatcher();

  const chartConfigs = [
    {
      query: {
        metrics:
          "ga:sessions,ga:users,ga:pageviews,ga:bounceRate,ga:avgTimeOnPage,ga:avgPageLoadTime"
      },
      chart: {
        type: "TABLE"
      }
    },
    {
      query: {
        metrics: "ga:users",
        dimensions: "ga:source"
      },
      chart: {
        type: "PIE",
        options: { title: "Traffic Sources" }
      }
    },
    {
      query: {
        metrics: "ga:sessions",
        dimensions: "ga:date"
      },
      chart: {
        type: "LINE",
        options: {
          width: "100%",
          title: "Sessions over date range."
        }
      }
    }
  ];

  let dataCharts;

  const initChart = (dateRange, ids, container) => {
    console.log("initChart", { ...dateRange, ids });
    dataCharts = [];
    chartConfigs.forEach((config, i) => {
      dataCharts[i] = new gapi.analytics.googleCharts.DataChart(config)
        .set({ query: { ...dateRange, ids: ids } })
        .set({ chart: { container: chartContainers[i] } })
        .execute();
    });
  };

  onMount(() => {
    console.log("onmount", dateRange, viewData, viewData.ids);
    if (dateRange && viewData && viewData.ids) {
      dataCharts = initChart(dateRange, viewData.ids);
    }
  });

  $: dataCharts =
    dateRange && viewData && viewData.ids
      ? initChart(dateRange, viewData.ids)
      : null;
</script>

{#if viewData}
  <section
    class="p-2 m-2 rounded border shadow relative max-w-full bg-gray-200">
    <div class="flex">
      <h1 class="text-sm font-bold text-blue-800 pr-8">
        {viewData.property.name}({viewData.view.name})
      </h1>
      <span
        class="text-xs font-bold cursor-pointer"
        on:click={() => {
          expanded = !expanded;
        }}>
        {#if expanded}(collapse){:else}(expand){/if}
      </span>
      <span
        on:click={() => {
          if (window.confirm('Do you really want to delete this property from dashboard?')) {
            dispatch('remove', viewData);
          }
        }}
        class="text-xs font-bold text-red-800 ml-2 cursor-pointer"
        title="Delete property dashboard">
        (delete)
      </span>
    </div>

    <div class="flex w-full flex-wrap" class:hidden={!expanded}>
      {#each chartConfigs as chartConfig, i}
        <div
          bind:this={chartContainers[i]}
          class="p-1 m-1 shadow rounded max-w-full bg-gray-100" />
      {/each}
    </div>

  </section>
{/if}
